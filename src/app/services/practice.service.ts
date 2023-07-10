import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HeadersService} from './headers.service';
import {PracticeStoreRequest, PracticeEditResponse, PracticeUpdateRequest} from '../models/practice';

@Injectable({
    providedIn: 'root'
})
export class PracticeService{
    url = 'https://special-olympics-api.herokuapp.com/practices';

    constructor(
        private http: HttpClient,
        private headersService: HeadersService
    ){}

    store(clubId: number, practiceStoreRequest: PracticeStoreRequest){
        const url = `https://special-olympics-api.herokuapp.com/clubs/${clubId}/practices`;

        return this.http.post(url, practiceStoreRequest, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    edit(id: number): Observable<PracticeEditResponse>{
        return this.http.get<PracticeEditResponse>(`${this.url}/${id}/edit`, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    update(id: number, practiceUpdateRequest: PracticeUpdateRequest){
        return this.http.patch(`${this.url}/${id}`, practiceUpdateRequest, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    destroy(id: number){
        return this.http.delete(`${this.url}/${id}`, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    handleError(error){
        return throwError(error.error);
    }
}
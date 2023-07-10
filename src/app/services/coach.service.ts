import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HeadersService} from './headers.service';
import {CoachStoreRequest, CoachStoreResponse, CoachIndexResponseItem, CoachUpdateRequest} from '../models/coach';

@Injectable({
    providedIn: 'root'
})
export class CoachService{
    url = 'https://special-olympics-api.herokuapp.com/coaches';

    constructor(
        private http: HttpClient,
        private headersService: HeadersService
    ){}

    index(sportId: number): Observable<CoachIndexResponseItem[]>{
        const url = `https://special-olympics-api.herokuapp.com/sports/${sportId}/coaches`
        return this.http.get<CoachIndexResponseItem[]>(url, this.headersService.buildHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    store(sportId: number, coachStoreRequest: CoachStoreRequest): Observable<CoachStoreResponse>{
        const url = `https://special-olympics-api.herokuapp.com/sports/${sportId}/coaches`
        return this.http.post<CoachStoreResponse>(url, coachStoreRequest, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    storePicture(id: number, picture: File){
        const formData = new FormData();
        formData.append('picture', picture);

        return this.http.post(`${this.url}/${id}/picture`, formData, this.headersService.buildFileHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    destroy(id: number){
        return this.http.delete(`${this.url}/${id}`, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    update(id: number, coachUpdateRequest: CoachUpdateRequest){
        return this.http.patch(`${this.url}/${id}`, coachUpdateRequest, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    handleError(error){
        return throwError(error.error);
    }
}
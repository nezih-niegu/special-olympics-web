import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HeadersService} from './headers.service';
import {ClubIndexResponse, ClubStoreRequest, ClubEditResponse, ClubUpdateRequest} from '../models/club'

@Injectable({
    providedIn: 'root'
})
export class ClubService{
    url = 'https://special-olympics-api.herokuapp.com/clubs';

    constructor(
        private http: HttpClient,
        private headersService: HeadersService
    ){}

    index(municipalityId: number, page: number, pageSize: number): Observable<ClubIndexResponse>{
        const url = `https://special-olympics-api.herokuapp.com/municipalities/${municipalityId}/clubs`;

        return this.http.get<ClubIndexResponse>(`${url}?page=${page}&pageSize=${pageSize}`, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    store(municipalityId: number, clubStoreRequest: ClubStoreRequest){
        const url = `https://special-olympics-api.herokuapp.com/municipalities/${municipalityId}/clubs`;

        return this.http.post(url, clubStoreRequest, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    edit(id: number): Observable<ClubEditResponse>{
        return this.http.get<ClubEditResponse>(`${this.url}/${id}/edit`, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    update(id: number, clubUpdateRequest: ClubUpdateRequest){
        return this.http.patch(`${this.url}/${id}`, clubUpdateRequest, this.headersService.buildAuthHeaders()).pipe(
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
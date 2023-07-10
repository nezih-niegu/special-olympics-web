import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HeadersService} from './headers.service';
import {AuthService} from '../auth/auth.service';
import {ActivityIndexResponse, ActivityStoreRequest, ActivityStoreResponse, ActivityShowResponse, ActivityUpdateRequest, ActivityEditResponse} from '../models/activity';

@Injectable({
    providedIn: 'root'
})
export class ActivityService{
    url = 'https://special-olympics-api.herokuapp.com/activities';

    constructor(
        private http: HttpClient,
        private headersService: HeadersService,
        private authService: AuthService
    ){}

    index(page: number, pageSize: number): Observable<ActivityIndexResponse>{
        const url = `https://special-olympics-api.herokuapp.com/states/${this.authService.getStateId()}/activities`;

        return this.http.get<ActivityIndexResponse>(`${url}?page=${page}&pageSize=${pageSize}`, this.headersService.buildHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    store(activityStoreRequest: ActivityStoreRequest): Observable<ActivityStoreResponse>{
        return this.http.post<ActivityStoreResponse>(this.url, activityStoreRequest, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    storeImage(id: number, image: File){
        const formData = new FormData();
        formData.append('image', image);

        return this.http.post(`${this.url}/${id}/image`, formData, this.headersService.buildFileHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    destroy(id: number){
        return this.http.delete(`${this.url}/${id}`, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    show(id: number): Observable<ActivityShowResponse>{
        return this.http.get<ActivityShowResponse>(`${this.url}/${id}`, this.headersService.buildHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    edit(id: number): Observable<ActivityEditResponse>{
        return this.http.get<ActivityEditResponse>(`${this.url}/${id}/edit`, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    update(id: number, activityUpdateRequest: ActivityUpdateRequest){
        return this.http.patch(`${this.url}/${id}`, activityUpdateRequest, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    handleError(error){
        return throwError(error.error);
    }
}
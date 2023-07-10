import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HeadersService} from './headers.service';
import {SportStoreRequest, SportStoreResponse, SportIndexResponse, SportShowResponse, SportUpdateRequest, SportUpdateResponse} from '../models/sport';
import {AuthService} from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class SportService{
    url = 'https://special-olympics-api.herokuapp.com/sports'

    constructor(
        private http: HttpClient,
        private headersService: HeadersService,
        private authService: AuthService
    ){}

    store(sportStoreRequest: SportStoreRequest): Observable<SportStoreResponse>{
        return this.http.post<SportStoreResponse>(this.url, sportStoreRequest, this.headersService.buildAuthHeaders()).pipe(
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

    storeManual(id: number, manual: File){
        const formData = new FormData();
        formData.append('manual', manual);

        return this.http.post(`${this.url}/${id}/manual`, formData, this.headersService.buildFileHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    destroy(id: number){
        return this.http.delete(`${this.url}/${id}`, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    index(page: number, pageSize: number): Observable<SportIndexResponse>{
        const url = `https://special-olympics-api.herokuapp.com/states/${this.authService.getStateId()}/sports`;
        
        return this.http.get<SportIndexResponse>(`${url}?page=${page}&pageSize=${pageSize}`, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    show(id: number): Observable<SportShowResponse>{
        return this.http.get<SportShowResponse>(`${this.url}/${id}`, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    update(id: number, sportUpdateRequest: SportUpdateRequest): Observable<SportUpdateResponse>{
        return this.http.patch<SportUpdateResponse>(`${this.url}/${id}`, sportUpdateRequest, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    handleError(error){
        return throwError(error.error);
    }
}
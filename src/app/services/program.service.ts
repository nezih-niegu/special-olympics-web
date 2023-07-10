import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {throwError, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HeadersService} from './headers.service';
import {ProgramIndexResponse, ProgramStoreRequest, ProgramStoreResponse, ProgramEditResponse, ProgramUpdateRequest} from '../models/program';
import {AuthService} from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class ProgramService{
    url = 'https://special-olympics-api.herokuapp.com/programs';

    constructor(
        private http: HttpClient,
        private headersService: HeadersService,
        private authService: AuthService
    ){}

    index(page: number, pageSize: number): Observable<ProgramIndexResponse>{
        const url = `https://special-olympics-api.herokuapp.com/states/${this.authService.getStateId()}/programs`;

        return this.http.get<ProgramIndexResponse>(`${url}?page=${page}&pageSize=${pageSize}`, this.headersService.buildHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    store(programStoreRequest: ProgramStoreRequest): Observable<ProgramStoreResponse>{
        return this.http.post<ProgramStoreResponse>(this.url, programStoreRequest, this.headersService.buildAuthHeaders()).pipe(
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

    edit(id: number): Observable<ProgramEditResponse>{
        return this.http.get<ProgramEditResponse>(`${this.url}/${id}/edit`, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    update(id: number, programUpdateRequest: ProgramUpdateRequest){
        return this.http.patch(`${this.url}/${id}`, programUpdateRequest, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    handleError(error){
        return throwError(error.error);
    }
}
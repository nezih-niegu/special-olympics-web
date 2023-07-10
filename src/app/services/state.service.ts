import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {throwError, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HeadersService} from './headers.service';
import {StateAdminsIndexResponse, StateContactShowResponse, StateContactUpdateRequest, StateStoreRequest, StateStoreResponse, StateUpdateRequest} from '../models/state';
import {AuthService} from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class StateService{
    url = 'https://special-olympics-api.herokuapp.com/states';

    constructor(
        private http: HttpClient,
        private headersService: HeadersService,
        private authService: AuthService
    ){}

    adminIndex(page: number, pageSize: number): Observable<StateAdminsIndexResponse>{
        const url = `https://special-olympics-api.herokuapp.com/state-admins?page=${page}&pageSize=${pageSize}`;

        return this.http.get<StateAdminsIndexResponse>(url, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    store(stateStoreRequest: StateStoreRequest): Observable<StateStoreResponse>{
        return this.http.post<StateStoreResponse>(this.url, stateStoreRequest, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    update(id: number, stateUpdateRequest: StateUpdateRequest){
        return this.http.patch(`${this.url}/${id}`, stateUpdateRequest, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    destroy(id: number){
        return this.http.delete(`${this.url}/${id}`, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    updateContact(stateContactUpdateRequest: StateContactUpdateRequest){
        return this.http.patch(`${this.url}/${this.authService.getStateId()}/contact`, stateContactUpdateRequest, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    showContact(): Observable<StateContactShowResponse>{
        return this.http.get<StateContactShowResponse>(`${this.url}/${this.authService.getStateId()}/contact`, this.headersService.buildHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    handleError(error){
        return throwError(error.error);
    }
}
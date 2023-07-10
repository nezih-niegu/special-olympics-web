import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

import {EventResponseIndexItem, EventStoreRequest, EventEditResponse, EventUpdateRequest} from '../models/event';
import {AuthService} from '../auth/auth.service';
import {HeadersService} from './headers.service';

@Injectable({
    providedIn: 'root'
})
export class EventService{
    url = 'https://special-olympics-api.herokuapp.com/events';

    constructor(
        private authService: AuthService,
        private http: HttpClient,
        private headersService: HeadersService
    ){}

    index(): Observable<EventResponseIndexItem[]>{
        const url = `https://special-olympics-api.herokuapp.com/states/${this.authService.getStateId()}/events`;

        return this.http.get<EventResponseIndexItem[]>(url, this.headersService.buildHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    store(eventStoreRequest: EventStoreRequest){
        const url = `https://special-olympics-api.herokuapp.com/states/${this.authService.getStateId()}/events`;

        return this.http.post(url, eventStoreRequest, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    edit(id: number): Observable<EventEditResponse>{
        return this.http.get<EventEditResponse>(`${this.url}/${id}/edit`, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    update(id: number, eventUpdateRequest: EventUpdateRequest){
        return this.http.patch(`${this.url}/${id}`, eventUpdateRequest, this.headersService.buildAuthHeaders()).pipe(
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
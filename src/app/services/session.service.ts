import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HeadersService} from './headers.service';
import {SessionIndexResponseItem} from '../models/session';

@Injectable({
    providedIn: 'root'
})
export class SessionService{
    constructor(
        private http: HttpClient,
        private headersService: HeadersService
    ){}

    index(clubId: number): Observable<SessionIndexResponseItem[]>{
        const url = `https://special-olympics-api.herokuapp.com/clubs/${clubId}/sessions`;

        return this.http.get<SessionIndexResponseItem[]>(url, this.headersService.buildHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    handleError(error){
        return throwError(error.error);
    }
}
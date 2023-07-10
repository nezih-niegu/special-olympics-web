import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HeadersService} from './headers.service';
import {MunicipalityIndexResponseItem, MunicipalityStoreRequest, MunicipalityStoreResponse} from '../models/municipality'
import {AuthService} from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class MunicipalityService{
    constructor(
        private http: HttpClient,
        private headersService: HeadersService,
        private authService: AuthService
    ){}

    index(): Observable<MunicipalityIndexResponseItem[]>{
        const url =  `https://special-olympics-api.herokuapp.com/states/${this.authService.getStateId()}/municipalities`;

        return this.http.get<MunicipalityIndexResponseItem[]>(url, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    store(municipalityStoreRequest: MunicipalityStoreRequest): Observable<MunicipalityStoreResponse>{
        const url = `https://special-olympics-api.herokuapp.com/states/${this.authService.getStateId()}/municipalities`;

        return this.http.post<MunicipalityStoreResponse>(url, municipalityStoreRequest, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    handleError(error){
        return throwError(error.error);
    }
}
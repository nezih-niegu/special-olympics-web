import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HeadersService} from './headers.service';
import {LocationIndexResponseItem} from '../models/location';

@Injectable({
    providedIn: 'root'
})
export class LocationService{
    url = 'https://special-olympics-api.herokuapp.com/locations'

    constructor(
        private http: HttpClient,
        private headersService: HeadersService
    ){}

    index(): Observable<LocationIndexResponseItem[]>{
        return this.http.get<LocationIndexResponseItem[]>(`${this.url}`, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    handleError(error){
        return throwError(error.error);
    }
}
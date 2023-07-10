import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError, Observable} from 'rxjs';

import {HeadersService} from './headers.service';
import {PictureStoreResponse, PictureIndexResponse} from '../models/picture';

@Injectable({
    providedIn: 'root'
})
export class PictureService{
    url = 'https://special-olympics-api.herokuapp.com/galleries';

    constructor(
        private http: HttpClient,
        private headersService: HeadersService
    ){}

    index(galleryId: number, page: number, pageSize: number): Observable<PictureIndexResponse>{
        return this.http.get<PictureIndexResponse>(`${this.url}/${galleryId}/pictures?page=${page}&pageSize=${pageSize}`, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    store(galleryId: number, file: File): Observable<PictureStoreResponse>{
        const formData = new FormData();
        formData.append('file', file);

        return this.http.post<PictureStoreResponse>(`${this.url}/${galleryId}/pictures`, formData, this.headersService.buildFileHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    destroy(id: number){
        const url = `https://special-olympics-api.herokuapp.com/pictures/${id}`;

        return this.http.delete(url, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    handleError(error){
        return throwError(error.error);
    }
}
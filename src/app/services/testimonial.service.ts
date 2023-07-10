import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {throwError, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HeadersService} from './headers.service';
import {TestimonialIndexResponse, TestimonialStoreResponse, TestimonialStoreRequest, TestimonialEditResponse, TestimonialUpdateRequest} from '../models/testimonial';
import {AuthService} from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class TestimonialService{
    url = 'https://special-olympics-api.herokuapp.com/testimonials';

    constructor(
        private http: HttpClient,
        private headersService: HeadersService,
        private authService: AuthService
    ){}

    index(page: number, pageSize: number): Observable<TestimonialIndexResponse>{
        const url = `https://special-olympics-api.herokuapp.com/states/${this.authService.getStateId()}/testimonials?page=${page}&pageSize=${pageSize}`;

        return this.http.get<TestimonialIndexResponse>(url, this.headersService.buildHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    store(testimonialStoreRequest: TestimonialStoreRequest): Observable<TestimonialStoreResponse>{
        return this.http.post<TestimonialStoreResponse>(this.url, testimonialStoreRequest, this.headersService.buildAuthHeaders()).pipe(
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

    edit(id: number): Observable<TestimonialEditResponse>{
        return this.http.get<TestimonialEditResponse>(`${this.url}/${id}/edit`, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    update(id: number, testimonialUpdateRequest: TestimonialUpdateRequest){
        return this.http.patch(`${this.url}/${id}`, testimonialUpdateRequest, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    handleError(error){
        return throwError(error.error);
    }
}
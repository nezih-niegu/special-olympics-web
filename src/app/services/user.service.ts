import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {throwError, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {HeadersService} from './headers.service'; 
import {UserLoginRequest, UserLoginResponse, UserRequestIndexResponse, UserRequestUpdateRequest, UserIndexResponse, UserStatusShowResponse, UserPasswordStoreRequest, PasswordRequestSendRequest, PasswordResetRequest} from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class UserService{
    url = 'https://special-olympics-api.herokuapp.com/users'

    constructor(
        private http: HttpClient,
        private headersService: HeadersService
    ){}

    login(userLoginRequest: UserLoginRequest): Observable<UserLoginResponse>{
        return this.http.post<UserLoginResponse>(`${this.url}/admin-login`, userLoginRequest, this.headersService.buildHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    logout(){
        return this.http.delete(`${this.url}/logout`, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    requestIndex(stateId: number, page: number, pageSize: number): Observable<UserRequestIndexResponse>{
        const url = `https://special-olympics-api.herokuapp.com/states/${stateId}/user-requests?page=${page}&pageSize=${pageSize}`;
        return this.http.get<UserRequestIndexResponse>(url, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    updateRequest(id: number, userRequestUpdateRequest: UserRequestUpdateRequest){
        const url = `https://special-olympics-api.herokuapp.com/user-requests/${id}`
        return this.http.patch(url, userRequestUpdateRequest, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    index(stateId: number, page: number, pageSize: number): Observable<UserIndexResponse>{
        const url = `https://special-olympics-api.herokuapp.com/states/${stateId}/users?page=${page}&pageSize=${pageSize}`;

        return this.http.get<UserIndexResponse>(url, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    destroy(id: number){
        return this.http.delete(`${this.url}/${id}`, this.headersService.buildAuthHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    showStatus(id: number): Observable<UserStatusShowResponse>{
        return this.http.get<UserStatusShowResponse>(`${this.url}/${id}/status`, this.headersService.buildHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    storePassword(id: number, userPasswordStoreRequest: UserPasswordStoreRequest){
        return this.http.post(`${this.url}/${id}/password`, userPasswordStoreRequest, this.headersService.buildHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    forgotPassword(passwordRequestSendRequest: PasswordRequestSendRequest){
        return this.http.post(`${this.url}/forgot-password`, passwordRequestSendRequest, this.headersService.buildHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    resetPassword(passwordResetRequest: PasswordResetRequest){
        return this.http.patch(`${this.url}/reset-password`, passwordResetRequest, this.headersService.buildHeaders()).pipe(
            catchError(this.handleError)
        );
    }

    handleError(error){
        return throwError(error.error);
    }
}
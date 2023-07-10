import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';

import {AuthService} from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class HeadersService{
    constructor(
        private authService: AuthService
    ){}

    buildHeaders(){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    }

    buildAuthHeaders(){
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        };
    }

    buildFileHeaders(){
        return {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.authService.getToken()}`
            })
        };
    }
}
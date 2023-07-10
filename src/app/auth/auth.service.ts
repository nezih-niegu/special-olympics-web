import {Injectable} from '@angular/core';
import * as moment from 'moment';

import {UserLoginResponse} from '../models/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService{
    constructor(){}

    setSession(userLoginResponse: UserLoginResponse){
        const expiresAt = moment().add(userLoginResponse.expires_in, 'second');

        localStorage.setItem('id', userLoginResponse.user.id.toString());
        localStorage.setItem('access', userLoginResponse.user.access.toString());
        localStorage.setItem('state_id', userLoginResponse.user.state_id ? userLoginResponse.user.state_id.toString() : null);
        localStorage.setItem('token', userLoginResponse.token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

    getExpiration(){
        const expiresAt = JSON.parse(localStorage.getItem('expires_at'));

        return moment(expiresAt);
    }

    isSessionActive(){
        return moment().isBefore(this.getExpiration());
    }

    getToken(){
        return localStorage.getItem('token');
    }

    getStateId(){
        return localStorage.getItem('state_id');
    }

    getAccess(){
        return localStorage.getItem('access');
    }

    unsetSession(){
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
    }
}
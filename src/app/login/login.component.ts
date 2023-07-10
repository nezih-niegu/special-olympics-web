import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UserLoginRequest} from '../models/user';
import {UserService} from '../services/user.service';
import {AuthService} from '../auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
    loginForm = this.fb.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
    });
    alert = '&nbsp;'

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private authService: AuthService,
        private router: Router
    ){}

    ngOnInit(){}

    login(userLoginRequest: UserLoginRequest){
        this.userService.login(userLoginRequest).subscribe((userLoginResponse) => {
            this.authService.setSession(userLoginResponse);
            this.router.navigate(['/']);
        }, (error) => {
            this.alert = error.message;
        });
    }
}

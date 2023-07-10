import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, Validators} from '@angular/forms';

import {UserService} from '../services/user.service';
import {UserPasswordStoreRequest} from '../models/user';

@Component({
    selector: 'app-create-user-password',
    templateUrl: './create-user-password.component.html',
    styleUrls: ['./create-user-password.component.css']
})
export class CreateUserPasswordComponent implements OnInit{
    id: number;
    status: number;
    storeUserPasswordForm = this.fb.group({
        password: ['', Validators.required],
        password_confirmation: ['', Validators.required]
    });
    alert = '&nbsp;'

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ){}

    ngOnInit(){
        this.id = +this.route.snapshot.paramMap.get('id');
        this.showUserStatus();
    }

    showUserStatus(){
        this.userService.showStatus(this.id).subscribe((userStatusShowResponse) => {
            this.status = userStatusShowResponse.status;
        }, (error) => {
            this.status = 1;
        });
    }

    storeUserPassword(){
        this.route.queryParams.subscribe(({token}) => {
            const userPasswordStoreRequest: UserPasswordStoreRequest = {
                ...this.storeUserPasswordForm.value,
                token
            };

            this.userService.storePassword(this.id, userPasswordStoreRequest).subscribe(() => {
                this.router.navigate(['/login']);
            }, (error) => {
                this.alert = error.message;
            })
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordResetRequest } from '../models/user';
import { UserService } from '../services/user.service';
@Component({
    selector: 'app-reset-user-password',
    templateUrl: './reset-user-password.component.html',
    styleUrls: ['./reset-user-password.component.css']
})
export class ResetUserPasswordComponent implements OnInit {

    resetUserPasswordForm = this.fb.group({
        password: ['', Validators.required],
        password_confirmation: ['', Validators.required]
    });

    alert = '&nbsp;';

    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    resetPassword(){
        this.route.queryParams.subscribe(({token})=>{
            const passwordResetRequest: PasswordResetRequest = {
                ...this.resetUserPasswordForm.value,
                token
            }
            this.userService.resetPassword(passwordResetRequest).subscribe(()=>{
                this.router.navigate(['/login']);
            },(error)=>{
                this.alert = error.message;
            });
        });
    }

}

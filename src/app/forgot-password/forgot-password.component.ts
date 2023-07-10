import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { PasswordRequestSendRequest } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    forgotPasswordForm = this.fb.group({
        email: ['', Validators.required]
    });

    alert = '&nbsp;';

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit() {
    }

    forgotPassword(passwordRequestSendRequest: PasswordRequestSendRequest){
        this.userService.forgotPassword(passwordRequestSendRequest).subscribe(()=>{
            this.router.navigate(['/forgot-password-email-sent']);
        }, (error) => {
            this.alert = error.message;
        })
    }


}



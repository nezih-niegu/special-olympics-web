import {Component, OnInit, Input} from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from '../services/user.service';
import {AuthService} from '../auth/auth.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit{
    @Input() title: string;
    @Input() back: string;
    access: number;

    constructor(
        private userService: UserService,
        private authService: AuthService,
        private router: Router
    ){}

    ngOnInit(){
        this.access = parseInt(this.authService.getAccess());
    }

    logout(){
        this.userService.logout().subscribe(() => {
            this.authService.unsetSession();
            this.router.navigate(['/login']);
        }, (error) => {
            alert(error.message);
        });
    }
}

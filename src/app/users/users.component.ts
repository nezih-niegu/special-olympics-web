import {Component, OnInit} from '@angular/core';

import {UserRequestIndexResponseItem, UserIndexResponseItem} from '../models/user';
import {UserService} from '../services/user.service';
import {AuthService} from '../auth/auth.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit{
    userRequests: UserRequestIndexResponseItem[];
    userRequestTotal: number;
    userRequestsPage = 0;
    users: UserIndexResponseItem[];
    userTotal: number;
    usersPage = 0;
    pageSize = 5;

    constructor(
        private userService: UserService,
        private authService: AuthService
    ){}

    ngOnInit(){
        this.userRequestIndex();
        this.userIndex();
    }

    userRequestIndex(){
        this.userService.requestIndex(parseInt(this.authService.getStateId()), this.userRequestsPage, this.pageSize).subscribe((userRequestIndexResponse) => {
            this.userRequests =  userRequestIndexResponse.user_requests;
            this.userRequestTotal = userRequestIndexResponse.total;
        }, (error) => {
            alert(error.message);
        })
    }

    userIndex(){
        this.userService.index(parseInt(this.authService.getStateId()), this.usersPage, this.pageSize).subscribe((userIndexResponse) => {
            this.users = userIndexResponse.users;
            this.userTotal = userIndexResponse.total;
        }, (error) => {
            alert(error.message);
        });
    }

    changeUserRequestsPage(event){
        this.userRequestsPage = event.pageIndex;
        this.userRequestIndex();
    }
    
    changeUsersPage(event){
        this.usersPage = event.pageIndex;
        this.userIndex();
    }

    resolveUserRequest(id: number, accepted: boolean){
        this.userService.updateRequest(id, {
            accepted
        }).subscribe(() => {
            this.userRequestIndex();
            this.userIndex();
        }, (error) => {
            alert(error.message);
        });
    }

    destroyUser(id: number){
        this.userService.destroy(id).subscribe(() => {
            this.userIndex();
        }, (error) => {
            alert(error.message);
        });
    }
}

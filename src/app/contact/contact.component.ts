import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {StateContactShowResponse} from '../models/state';
import {StateService} from '../services/state.service';
import {EditContactComponent} from '../edit-contact/edit-contact.component';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
    state: StateContactShowResponse;
    loading = true;

    constructor(
        private stateService: StateService,
        public dialog: MatDialog
    ){}

    ngOnInit(){
        this.showStateContact();
    }

    showStateContact(){
        this.stateService.showContact().subscribe((stateContactShowResponse) => {
            this.state = stateContactShowResponse;
            this.loading = false;
        }, (error) => {
            alert(error.message);
        });
    }

    openEditContactDialog(){
        const dialogRef = this.dialog.open(EditContactComponent, {
            width: '500px',
            data: this.state
        });

        dialogRef.afterClosed().subscribe((state) => {
            if(state){
                this.state = state;
            }
        });
    }
}

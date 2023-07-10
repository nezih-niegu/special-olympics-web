import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {StateService} from '../services/state.service';
import {StateAdminsIndexResponseItem} from '../models/state';
import {CreateStateComponent} from '../create-state/create-state.component';
import {EditStateComponent} from '../edit-state/edit-state.component';

@Component({
    selector: 'app-states',
    templateUrl: './states.component.html',
    styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit{
    states: StateAdminsIndexResponseItem[]
    total: number;
    pageSize = 10;
    page = 0;

    constructor(
        private stateService: StateService,
        public dialog: MatDialog
    ){}

    ngOnInit(){
        this.adminIndex();
    }

    adminIndex(){
        this.stateService.adminIndex(this.page, this.pageSize).subscribe((stateAdminsIndexResponse) => {
            this.states = stateAdminsIndexResponse.states;
            this.total = stateAdminsIndexResponse.total;
        }, (error) => {
            alert(error.message);
        });
    }

    changePage(event){
        this.page = event.pageIndex;
        this.adminIndex();
    }

    openCreateStateDialog(){
        const dialogRef = this.dialog.open(CreateStateComponent, {
            width: '500px'
        });

        dialogRef.afterClosed().subscribe((state) => {
            if(state){
                this.states.push(state);
            }
        });
    }

    openEditStateDialog(id: number){
        const state = this.states.find((state) => {
            return state.id == id;
        });

        const dialogRef = this.dialog.open(EditStateComponent, {
            width: '500px',
            data: state
        });

        dialogRef.afterClosed().subscribe((updatedState) => {
            if(updatedState){
                state.name = updatedState.name;
                state.admin_name = updatedState.admin_name;
                state.email = updatedState.email;
            }
        });
    }

    destroyState(id: number){
        this.stateService.destroy(id).subscribe(() => {
            this.states = this.states.filter((state) => {
                return state.id != id;
            });
        }, (error) => {
            alert(error.message);
        });
    }
}

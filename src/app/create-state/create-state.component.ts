import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';

import {StateStoreRequest} from '../models/state'
import {StateService} from '../services/state.service';

@Component({
    selector: 'app-create-state',
    templateUrl: './create-state.component.html',
    styleUrls: ['./create-state.component.css']
})
export class CreateStateComponent implements OnInit{
    storeStateForm = this.fb.group({
        name: ['', Validators.required],
        admin_name: ['', Validators.required],
        email: ['', Validators.required]
    });
    alert = '&nbsp;'

    constructor(
        public dialogRef: MatDialogRef<CreateStateComponent>,
        private fb: FormBuilder,
        private stateService: StateService
    ){}

    ngOnInit(){
    }

    onCancel(){
        this.dialogRef.close();
    }

    storeState(stateStoreRequest: StateStoreRequest){
        this.stateService.store(stateStoreRequest).subscribe((stateStoreResponse) => {
            this.dialogRef.close({
                id: stateStoreResponse.id,
                ...stateStoreRequest
            });
        }, (error) => {
            this.alert = error.message;
        });
    }
}

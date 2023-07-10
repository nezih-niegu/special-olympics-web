import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {StateService} from '../services/state.service';
import {StateUpdateRequest} from '../models/state';

export interface DialogData{
    id: number;
    name: string;
    admin_name: string;
    email: string;
}

@Component({
    selector: 'app-edit-state',
    templateUrl: './edit-state.component.html',
    styleUrls: ['./edit-state.component.css']
})
export class EditStateComponent implements OnInit{
    updateStateForm = this.fb.group({
        name: [this.data.name, Validators.required],
        admin_name: [this.data.admin_name, Validators.required],
        email: [this.data.email, Validators.required]
    });
    alert = '&nbsp;'

    constructor(
        public dialogRef: MatDialogRef<EditStateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private fb: FormBuilder,
        private stateService: StateService
    ){}

    ngOnInit(){
    }

    onCancel(){
        this.dialogRef.close();
    }

    updateState(stateUpdateRequest: StateUpdateRequest){
        this.stateService.update(this.data.id, stateUpdateRequest).subscribe(() => {
            this.dialogRef.close(stateUpdateRequest);
        }, (error) => {
            this.alert = error.message;
        });
    }
}

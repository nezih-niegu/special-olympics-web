import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {StateContactUpdateRequest} from '../models/state';
import {StateService} from '../services/state.service';

export interface DialogData{
    email: string;
    facebook: string;
    instagram: string;
}

@Component({
    selector: 'app-edit-contact',
    templateUrl: './edit-contact.component.html',
    styleUrls: ['./edit-contact.component.css']
})
export class EditContactComponent implements OnInit{
    updateStateContactForm = this.fb.group({
        email: [this.data.email],
        facebook: [this.data.facebook],
        instagram: [this.data.instagram]
    });
    alert = '&nbsp;'

    constructor(
        public dialogRef: MatDialogRef<EditContactComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private fb: FormBuilder,
        private stateService: StateService
    ){}

    ngOnInit(){
    }

    onCancel(){
        this.dialogRef.close();
    }

    updateStateContact(stateContactUpdateRequest: StateContactUpdateRequest){
        this.stateService.updateContact(stateContactUpdateRequest).subscribe(() => {
            this.dialogRef.close(stateContactUpdateRequest);
        }, (error) => {
            this.alert = error.message;
        });
    }
}

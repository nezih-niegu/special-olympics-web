import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CoachService} from '../services/coach.service';
import {CoachUpdateRequest} from '../models/coach';

export interface DialogData{
    id: number;
    name: string;
    email: string;
    phone: string;
}

@Component({
    selector: 'app-edit-coach',
    templateUrl: './edit-coach.component.html',
    styleUrls: ['./edit-coach.component.css']
})
export class EditCoachComponent implements OnInit{
    updateCoachForm = this.fb.group({
        name: [this.data.name, Validators.required],
        email: [this.data.email, Validators.required],
        phone: [this.data.phone, Validators.required]
    });
    alert = '&nbsp;';
    
    constructor(
        public dialogRef: MatDialogRef<EditCoachComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private fb: FormBuilder,
        private coachService: CoachService
    ){}

    ngOnInit(){
    }

    onCancel(){
        this.dialogRef.close();
    }

    updateCoach(coachUpdateRequest: CoachUpdateRequest){
        this.coachService.update(this.data.id, coachUpdateRequest).subscribe(() => {
            this.dialogRef.close(coachUpdateRequest);
        }, (error) => {
            this.alert = error.message;
        });
    }
}

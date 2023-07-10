import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';

import {CoachStoreRequest} from '../models/coach';
import {CoachService} from '../services/coach.service';

export interface DialogData{
    id: number;
}

@Component({
    selector: 'app-create-coach',
    templateUrl: './create-coach.component.html',
    styleUrls: ['./create-coach.component.css']
})
export class CreateCoachComponent implements OnInit{
    storeCoachForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', Validators.required],
        phone: ['', Validators.required]
    })
    picture: File = null;
    alert = '&nbsp;'

    constructor(
        public dialogRef: MatDialogRef<CreateCoachComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private fb: FormBuilder,
        private coachService: CoachService
    ){}

    ngOnInit(){
    }

    onCancel(){
        this.dialogRef.close();
    }

    updatePicture(files: FileList){
        this.picture = files.item(0);
    }

    storeCoach(coachStoreRequest: CoachStoreRequest){
        this.coachService.store(this.data.id, coachStoreRequest).subscribe((coachStoreResponse) => {
            this.coachService.storePicture(coachStoreResponse.id, this.picture).subscribe(() => {
                this.dialogRef.close({
                    id: coachStoreResponse.id,
                    ...this.storeCoachForm.value
                })
            }, (error) => {
                this.coachService.destroy(coachStoreResponse.id).subscribe(() => {
                    this.alert = error.message;
                }, (error) => {
                    this.alert = error.message;
                });
            })
        }, (error) => {
            this.alert = error.message;
        });
    }
}

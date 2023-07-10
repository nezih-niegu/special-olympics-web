import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';

import {ActivityUpdateRequest} from '../models/activity';
import {ActivityService} from '../services/activity.service';

export interface DialogData{
    id: number;
    name: string;
    description: string;
}

@Component({
    selector: 'app-edit-activity-info',
    templateUrl: './edit-activity-info.component.html',
    styleUrls: ['./edit-activity-info.component.css']
})
export class EditActivityInfoComponent implements OnInit{
    updateActivityForm = this.fb.group({
        name: [this.data.name, Validators.required],
        description: [this.data.description, Validators.required]
    });
    alert = '&nbsp;';

    constructor(
        public dialogRef: MatDialogRef<EditActivityInfoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private fb: FormBuilder,
        private activityService: ActivityService
    ){}

    ngOnInit(){
    }

    onCancel(){
        this.dialogRef.close();
    }

    updateActivity(activityUpdateRequest: ActivityUpdateRequest){
        this.activityService.update(this.data.id, activityUpdateRequest).subscribe(() => {
            this.dialogRef.close(activityUpdateRequest);
        }, (error) => {
            this.alert = error.message;
        });
    }
}

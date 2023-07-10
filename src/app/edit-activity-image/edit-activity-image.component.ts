import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {ActivityService} from '../services/activity.service';

export interface DialogData{
    id: number;
}

@Component({
    selector: 'app-edit-activity-image',
    templateUrl: './edit-activity-image.component.html',
    styleUrls: ['./edit-activity-image.component.css']
})
export class EditActivityImageComponent implements OnInit{
    image: File = null;
    alert = '&nbsp;';

    constructor(
        public dialogRef: MatDialogRef<EditActivityImageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private activityService: ActivityService
    ){}

    ngOnInit(){
    }

    onCancel(){
        this.dialogRef.close();
    }

    updateImage(files: FileList){
        this.image = files.item(0);
    }

    updateActivityImage(){
        this.activityService.storeImage(this.data.id, this.image).subscribe(() => {
            this.dialogRef.close(true);
        }, (error) => {
            this.alert = error.message;
        });
    }
}

import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {SportService} from '../services/sport.service';

export interface DialogData{
    sportId: number;
}

@Component({
    selector: 'app-edit-sport-image',
    templateUrl: './edit-sport-image.component.html',
    styleUrls: ['./edit-sport-image.component.css']
})
export class EditSportImageComponent implements OnInit{
    image: File = null;
    alert = '&nbsp;'

    constructor(
        public dialogRef: MatDialogRef<EditSportImageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private sportService: SportService
    ){}

    ngOnInit() {
    }

    onCancel(){
        this.dialogRef.close();
    }

    updateImage(files: FileList){
        this.image = files.item(0);
    }

    updateSportImage(){
        this.sportService.storeImage(this.data.sportId, this.image).subscribe(() => {
            this.dialogRef.close();
        }, (error) => {
            this.alert = error.message;
        });
    }
}

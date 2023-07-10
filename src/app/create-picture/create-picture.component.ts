import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {PictureService} from '../services/picture.service';

export interface DialogData{
    galleryId: number;
}

@Component({
    selector: 'app-create-picture',
    templateUrl: './create-picture.component.html',
    styleUrls: ['./create-picture.component.css']
})
export class CreatePictureComponent implements OnInit{
    file: File = null;
    alert = '&nbsp;'

    constructor(
        public dialogRef: MatDialogRef<CreatePictureComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private pictureService: PictureService
    ){}

    ngOnInit(){
    }

    onCancel(){
        this.dialogRef.close();
    }

    updateFile(files: FileList){
        this.file = files.item(0);
    }

    storePicture(){
        this.pictureService.store(this.data.galleryId, this.file).subscribe((pictureStoreResponse) => {
            this.dialogRef.close(pictureStoreResponse);
        }, (error) => {
            this.alert = error.message;
        });
    }
}

import {Component, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import {ProgramService} from '../services/program.service';

export interface DialogData{
    id: number;
}

@Component({
    selector: 'app-edit-program-image',
    templateUrl: './edit-program-image.component.html',
    styleUrls: ['./edit-program-image.component.css']
})
export class EditProgramImageComponent implements OnInit{
    image: File = null;
    alert = '&nbsp;';

    constructor(
        public dialogRef: MatDialogRef<EditProgramImageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private programService: ProgramService
    ){}

    ngOnInit(){
    }

    onCancel(){
        this.dialogRef.close();
    }

    updateImage(files: FileList){
        this.image = files.item(0);
    }

    updateProgramImage(){
        this.programService.storeImage(this.data.id, this.image).subscribe(() => {
            this.dialogRef.close(true);
        }, (error) => {
            this.alert = error.message;
        });
    }
}

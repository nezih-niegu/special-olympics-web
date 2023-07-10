import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {SportService} from '../services/sport.service';

export interface DialogData{
    sportId: number;
}

@Component({
    selector: 'app-edit-sport-manual',
    templateUrl: './edit-sport-manual.component.html',
    styleUrls: ['./edit-sport-manual.component.css']
})
export class EditSportManualComponent implements OnInit{
    manual: File = null;
    alert = '&nbsp;'

    constructor(
        public dialogRef: MatDialogRef<EditSportManualComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private sportService: SportService
    ){}

    ngOnInit() {
    }

    onCancel(){
        this.dialogRef.close();
    }

    updateManual(files: FileList){
        this.manual = files.item(0);
    }

    updateSportManual(){
        this.sportService.storeManual(this.data.sportId, this.manual).subscribe(() => {
            this.dialogRef.close();
        }, (error) => {
            this.alert = error.message;
        });
    }
}

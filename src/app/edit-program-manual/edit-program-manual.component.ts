import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ProgramService} from '../services/program.service';

export interface DialogData{
    id: number;
}

@Component({
    selector: 'app-edit-program-manual',
    templateUrl: './edit-program-manual.component.html',
    styleUrls: ['./edit-program-manual.component.css']
})
export class EditProgramManualComponent implements OnInit{
    manual: File = null;
    alert = '&nbsp;'

    constructor(
        public dialogRef: MatDialogRef<EditProgramManualComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private programService: ProgramService
    ){}

    ngOnInit(){
    }

    onCancel(){
        this.dialogRef.close();
    }

    updateManual(files: FileList){
        this.manual = files.item(0);
    }

    updateProgramManual(){
        this.programService.storeManual(this.data.id, this.manual).subscribe(() => {
            this.dialogRef.close();
        }, (error) => {
            this.alert = error.message;
        });
    }
}

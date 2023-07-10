import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';

import {ProgramUpdateRequest} from '../models/program';
import {ProgramService} from '../services/program.service';

export interface DialogData{
    id: number;
    name: string;
    description: string;
}

@Component({
    selector: 'app-edit-program-info',
    templateUrl: './edit-program-info.component.html',
    styleUrls: ['./edit-program-info.component.css']
})
export class EditProgramInfoComponent implements OnInit{
    updateProgramForm = this.fb.group({
        name: [this.data.name, Validators.required],
        description: [this.data.description, Validators.required]
    })
    alert = '&nbsp;';

    constructor(
        public dialogRef: MatDialogRef<EditProgramInfoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private fb: FormBuilder,
        private programService: ProgramService
    ){}

    ngOnInit(){
    }

    onCancel(){
        this.dialogRef.close();
    }

    updateProgram(programUpdateRequest: ProgramUpdateRequest){
        this.programService.update(this.data.id, programUpdateRequest).subscribe(() => {
            this.dialogRef.close(programUpdateRequest);
        }, (error) => {
            this.alert = error.message;
        });
    }
}

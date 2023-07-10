import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-create-session',
    templateUrl: './create-session.component.html',
    styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent implements OnInit{
    storeSessionForm = this.fb.group({
        day: ['', Validators.required],
        start: ['', Validators.required],
        end: ['', Validators.required]
    });
    alert = '&nbsp;'

    constructor(
        public dialogRef: MatDialogRef<CreateSessionComponent>,
        private fb: FormBuilder,
    ){}

    ngOnInit(){
    }

    onCancel(){
        this.dialogRef.close();
    }

    storeSession(){
        this.dialogRef.close(this.storeSessionForm.value);
    }
}

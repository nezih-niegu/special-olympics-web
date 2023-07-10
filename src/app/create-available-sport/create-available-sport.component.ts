import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-create-available-sport',
    templateUrl: './create-available-sport.component.html',
    styleUrls: ['./create-available-sport.component.css']
})
export class CreateAvailableSportComponent implements OnInit{
    storeAvailableSportForm = this.fb.group({
        name: ['', Validators.required],
        address: ['', Validators.required]
    });
    alert = '&nbsp;'

    constructor(
        public dialogRef: MatDialogRef<CreateAvailableSportComponent>,
        private fb: FormBuilder
    ){}

    ngOnInit(){
    }

    onCancel(){
        this.dialogRef.close();
    }

    storeAvailableSport(){
        this.dialogRef.close(this.storeAvailableSportForm.value);
    }
}

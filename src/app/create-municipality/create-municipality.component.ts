import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';

import {MunicipalityStoreRequest} from '../models/municipality';
import {MunicipalityService} from '../services/municipality.service';

@Component({
    selector: 'app-create-municipality',
    templateUrl: './create-municipality.component.html',
    styleUrls: ['./create-municipality.component.css']
})
export class CreateMunicipalityComponent implements OnInit{
    storeMunicipalityForm = this.fb.group({
        name: ['', Validators.required]
    });
    alert = '&nbsp;'

    constructor(
        public dialogRef: MatDialogRef<CreateMunicipalityComponent>,
        private fb: FormBuilder,
        private municipalityService: MunicipalityService
    ){}

    ngOnInit(){
    }

    onCancel(){
        this.dialogRef.close();
    }

    storeMunicipality(municipalityStoreRequest: MunicipalityStoreRequest){
        this.municipalityService.store(municipalityStoreRequest).subscribe((municipalityStoreResponse) => {
            this.dialogRef.close({
                ...municipalityStoreResponse,
                ...municipalityStoreRequest
            });
        }, (error) => {
            this.alert = error.message;
        });
    }
}

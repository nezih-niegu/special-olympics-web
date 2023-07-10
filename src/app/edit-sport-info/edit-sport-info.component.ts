import {Component, OnInit, Inject, ViewChild, ElementRef} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import {LocationIndexResponseItem} from '../models/location';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {LocationService} from '../services/location.service';
import {SportService} from '../services/sport.service';
import {SportUpdateRequest} from '../models/sport';

export interface DialogData{
    id: number;
    name: string;
    description: string;
    notes: number;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    locations: {
        id: number;
        name: string;
    }[];
}

@Component({
    selector: 'app-edit-sport-info',
    templateUrl: './edit-sport-info.component.html',
    styleUrls: ['./edit-sport-info.component.css']
})
export class EditSportInfoComponent implements OnInit{
    updateSportForm = this.fb.group({
        name: [this.data.name, Validators.required],
        description: [this.data.description, Validators.required],
        notes: [this.data.notes, Validators.required],
        contact_name: [this.data.contact_name, Validators.required],
        contact_email: [this.data.contact_email, Validators.required],
        contact_phone: [this.data.contact_phone, Validators.required],
        locations: this.fb.array([])
    });
    locations: LocationIndexResponseItem[] = [];
    separatorKeysCodes: number[] = [ENTER, COMMA];
    selectedLocations = [];
    alert = '&nbsp;'

    @ViewChild('locationInput', {
        static: false
    }) locationInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto', {
        static: false
    }) matAutocomplete: MatAutocomplete;

    constructor(
        public dialogRef: MatDialogRef<EditSportInfoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private fb: FormBuilder,
        private locationService: LocationService,
        private sportService: SportService
    ){}

    ngOnInit(){
        this.locationIndex();
        this.selectedLocations = this.data.locations
    }

    locationIndex(){
        this.locationService.index().subscribe((locationIndexResponse) => {
            this.locations = locationIndexResponse;
        }, (error) => {
            this.alert = error.message;
        });
    }

    addLocation(event: MatChipInputEvent): void{
        const input = event.input;
        const value = event.value;

        if((value || '').trim()){
            this.selectedLocations.push({
                id: null,
                name: value.trim()
            });
        }

        if(input){
            input.value = '';
        }
    }

    selectedLocation(event: MatAutocompleteSelectedEvent): void{
        this.selectedLocations.push({
            id: event.option.value,
            name: event.option.viewValue
        });

        this.locationInput.nativeElement.value = '';
    }

    removeLocation(location): void{
        const index = this.selectedLocations.indexOf(location);

        if(index >= 0){
            this.selectedLocations.splice(index, 1);
        }
    }

    onCancel(){
        this.dialogRef.close();
    }

    updateSport(){
        const locations = this.updateSportForm.get('locations') as FormArray;

        locations.clear();
        this.selectedLocations.forEach((location) => {
            locations.push(new FormControl(location.id ? location.id : location.name));
        });

        const sportUpdateRequest: SportUpdateRequest = this.updateSportForm.value;

        this.sportService.update(this.data.id, sportUpdateRequest).subscribe((sportUpdateResponse) => {
            this.dialogRef.close({
                name: sportUpdateRequest.name,
                description: sportUpdateRequest.description,
                notes: sportUpdateRequest.notes,
                contact_name: sportUpdateRequest.contact_name,
                contact_email: sportUpdateRequest.contact_email,
                contact_phone: sportUpdateRequest.contact_phone,
                locations: sportUpdateResponse.locations
            });
        }, (error) => {
            this.alert = error.message;
        });
    }

}

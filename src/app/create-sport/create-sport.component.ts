import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Router} from '@angular/router';

import {LocationIndexResponseItem} from '../models/location'
import {LocationService} from '../services/location.service';
import {SportStoreRequest} from '../models/sport'
import {SportService} from '../services/sport.service';

@Component({
    selector: 'app-create-sport',
    templateUrl: './create-sport.component.html',
    styleUrls: ['./create-sport.component.css']
})
export class CreateSportComponent implements OnInit{
    storeSportForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        notes: ['', Validators.required],
        contact_name: ['', Validators.required],
        contact_email: ['', Validators.required],
        contact_phone: ['', Validators.required],
        locations: this.fb.array([])
    });
    image: File = null;
    manual: File = null;
    locations: LocationIndexResponseItem[] = []
    separatorKeysCodes: number[] = [ENTER, COMMA];
    selectedLocations = []
    alert = '&nbsp;'

    @ViewChild('locationInput', {
        static: false
    }) locationInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto', {
        static: false
    }) matAutocomplete: MatAutocomplete;

    constructor(
        private fb: FormBuilder,
        private locationService: LocationService,
        private sportService: SportService,
        private router: Router
    ){}

    ngOnInit(){
        this.locationIndex();
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

    storeSport(){
        const locations = this.storeSportForm.get('locations') as FormArray;

        locations.clear();
        this.selectedLocations.forEach((location) => {
            locations.push(new FormControl(location.id ? location.id : location.name));
        });

        const sportStoreRequest: SportStoreRequest = this.storeSportForm.value;

        this.sportService.store(sportStoreRequest).subscribe((sportStoreResponse) => {
            this.sportService.storeImage(sportStoreResponse.id, this.image).subscribe(() => {
                this.sportService.storeManual(sportStoreResponse.id, this.manual).subscribe(() => {
                    this.router.navigate(['/sports']);
                }, (error) => {
                    this.sportService.destroy(sportStoreResponse.id).subscribe(() => {
                        this.alert = error.message;
                    }, (error) => {
                        this.alert = error.message;
                    });
                });
            }, (error) => {
                this.sportService.destroy(sportStoreResponse.id).subscribe(() => {
                    this.alert = error.message;
                }, (error) => {
                    this.alert = error.message;
                });
            })
        }, (error) => {
            this.alert = error.message;
        });
    }

    updateImage(files: FileList){
        this.image = files.item(0);
    }

    updateManual(files: FileList){
        this.manual = files.item(0);
    }
}

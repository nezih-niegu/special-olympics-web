import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import * as moment from 'moment';

import {EventStoreRequest} from '../models/event';
import {EventService} from '../services/event.service';

@Component({
    selector: 'app-create-event',
    templateUrl: './create-event.component.html',
    styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit{
    storeEventForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        startDate: ['', Validators.required],
        startTime: ['', Validators.required],
        endDate: ['', Validators.required],
        endTime: ['', Validators.required],
        location: ['', Validators.required],
        contact_email: ['', Validators.required],
        type: ['', Validators.required]
    });
    alert = '&nbsp;';

    constructor(
        public dialogRef: MatDialogRef<CreateEventComponent>,
        private fb: FormBuilder,
        private eventService: EventService
    ){}

    ngOnInit(){
    }

    onCancel(){
        this.dialogRef.close();
    }

    storeEvent(){
        if(this.storeEventForm.value.startDate == '' || this.storeEventForm.value.startTime == '' || this.storeEventForm.value.endDate == '' || this.storeEventForm.value.endTime == ''){
            this.alert = 'Ingrese un periodo válido';
            return;
        }

        const eventStoreRequest: EventStoreRequest = {
            name: this.storeEventForm.value.name,
            description: this.storeEventForm.value.description,
            start: moment.utc(`${this.storeEventForm.value.startDate} ${this.storeEventForm.value.startTime}`).toDate(),
            end: moment.utc(`${this.storeEventForm.value.endDate} ${this.storeEventForm.value.endTime}`).toDate(),
            location: this.storeEventForm.value.location,
            contact_email: this.storeEventForm.value.contact_email,
            type: this.storeEventForm.value.type
        }

        this.eventService.store(eventStoreRequest).subscribe(() => {
            this.dialogRef.close(true);
        }, (error) => {
            this.alert = error.message;
        });
    }
}

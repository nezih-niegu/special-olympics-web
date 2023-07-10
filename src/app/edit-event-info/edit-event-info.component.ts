import {Component, OnInit, Inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as moment from 'moment';

import {EventUpdateRequest} from '../models/event';
import {EventService} from '../services/event.service';

export interface DialogData{
    id: number;
    name: string;
    description: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    location: string;
    contact_email: string;
    type: number;
    athletes: number;
    volunteers: number;
}

@Component({
    selector: 'app-edit-eventx-info',
    templateUrl: './edit-event-info.component.html',
    styleUrls: ['./edit-event-info.component.css']
})
export class EditEventInfoComponent implements OnInit{
    updateEventForm = this.fb.group({
        name: [this.data.name, Validators.required],
        description: [this.data.description, Validators.required],
        startDate: [this.data.startDate, Validators.required],
        startTime: [this.data.startTime, Validators.required],
        endDate: [this.data.endDate, Validators.required],
        endTime: [this.data.endTime, Validators.required],
        location: [this.data.location, Validators.required],
        contact_email: [this.data.contact_email, Validators.required],
        type: [this.data.type, Validators.required],
        athletes: [this.data.athletes],
        volunteers: [this.data.volunteers]
    });
    alert = '&nbsp;';

    constructor(
        public dialogRef: MatDialogRef<EditEventInfoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private fb: FormBuilder,
        private eventService: EventService
    ){}

    ngOnInit(){

    }

    onCancel(){
        this.dialogRef.close();
    }

    updateEvent(){
        if(this.updateEventForm.value.startDate == '' || this.updateEventForm.value.startTime == '' || this.updateEventForm.value.endDate == '' || this.updateEventForm.value.endTime == ''){
            this.alert = 'Ingrese un periodo válido';
            return;
        }

        const eventUpdateRequest: EventUpdateRequest = {
            name: this.updateEventForm.value.name,
            description: this.updateEventForm.value.description,
            start: moment.utc(`${this.updateEventForm.value.startDate} ${this.updateEventForm.value.startTime}`).toDate(),
            end: moment.utc(`${this.updateEventForm.value.endDate} ${this.updateEventForm.value.endTime}`).toDate(),
            location: this.updateEventForm.value.location,
            contact_email: this.updateEventForm.value.contact_email,
            type: this.updateEventForm.value.type,
            athletes: this.updateEventForm.value.athletes,
            volunteers: this.updateEventForm.value.volunteers
        }

        this.eventService.update(this.data.id, eventUpdateRequest).subscribe(() => {
            this.dialogRef.close(eventUpdateRequest);
        }, (error) => {
            this.alert = error.message;
        });
    }
}

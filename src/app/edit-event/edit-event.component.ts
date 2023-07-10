import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';

import {EventEditResponse} from '../models/event';
import {EditEventInfoComponent} from '../edit-event-info/edit-event-info.component'
import {EventService} from '../services/event.service';
import {PictureIndexResponseItem} from '../models/picture';
import {PictureService} from '../services/picture.service';
import {CreatePictureComponent} from '../create-picture/create-picture.component';

@Component({
    selector: 'app-edit-event',
    templateUrl: './edit-event.component.html',
    styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit{
    event: EventEditResponse;
    pictures: PictureIndexResponseItem[] = []
    galleryPage = 0;
    galleryPageSize = 6;
    pictureTotal: number;
    type = ['Deportivo selectivo', 'Deportivo de convivencia', 'Plática de familia', 'Comunidades Saludables', 'Evento social', 'Capacitación a entrenadores voluntarios'];
    loading = true;

    constructor(
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private eventService: EventService,
        private pictureService: PictureService,
        private router: Router
    ){}

    ngOnInit(){
        const id = +this.route.snapshot.paramMap.get('id');
        this.editEvent(id);
    }

    editEvent(id: number){
        this.eventService.edit(id).subscribe((eventEditResponse) => {
            this.event = eventEditResponse;
            this.pictureIndex();
        }, (error) => {
            alert(error.message);
        });
    }

    formatDate(dateString: Date){
        const date = moment.utc(dateString);
        
        return `${date.format('DD/MM/YYYY')} a las ${date.format('HH:mm')}`;
    }

    pictureIndex(){
        this.pictureService.index(this.event.gallery_id, this.galleryPage, this.galleryPageSize).subscribe((pictureIndexResponse) => {
            this.pictures = pictureIndexResponse.pictures;
            this.pictureTotal = pictureIndexResponse.total;
            this.loading = false;
        }, (error) => {
            alert(error.message);
        });
    }

    openEditEventInfoDialog(){
        const start = moment.utc(this.event.start);
        const end = moment.utc(this.event.end);

        const dialogRef = this.dialog.open(EditEventInfoComponent, {
            width: '500px',
            data: {
                id: this.event.id,
                name: this.event.name,
                description: this.event.description,
                startDate: start.format('YYYY-MM-DD'),
                startTime: start.format('HH:mm'),
                endDate: end.format('YYYY-MM-DD'),
                endTime: end.format('HH:mm'),
                location: this.event.location,
                contact_email: this.event.contact_email,
                type: this.event.type,
                athletes: this.event.athletes,
                volunteers: this.event.volunteers
            }
        });

        dialogRef.afterClosed().subscribe((event) => {
            if(event){
                this.event.name = event.name;
                this.event.description = event.description;
                this.event.start =  event.start;
                this.event.end = event.end;
                this.event.location = event.location;
                this.event.contact_email = event.contact_email;
                this.event.type = event.type;
                this.event.athletes = event.athletes;
                this.event.volunteers = event.volunteers;
            }
        });
    }

    changeGalleryPage(event){
        this.galleryPage = event.pageIndex;
        this.pictureIndex();
    }

    openCreatePictureDialog(){
        const dialogRef = this.dialog.open(CreatePictureComponent, {
            width: '500px',
            data: {
                galleryId: this.event.gallery_id
            }
        });

        dialogRef.afterClosed().subscribe((picture) => {
            if(picture){
                this.pictureIndex();
            }
        });
    }

    destroyPicture(id: number){
        this.pictureService.destroy(id).subscribe(() => {
            this.pictureIndex();
        }, (error) => {
            alert(error.message);
        });
    }
}

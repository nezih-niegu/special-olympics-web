import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {CalendarEvent} from 'angular-calendar';
import * as moment from 'moment';

import {ClubEditResponse} from '../models/club';
import {EditClubInfoComponent} from '../edit-club-info/edit-club-info.component'
import {ClubService} from '../services/club.service';
import {SessionService} from '../services/session.service';
import {PictureIndexResponseItem} from '../models/picture';
import {PictureService} from '../services/picture.service';
import {CreatePictureComponent} from '../create-picture/create-picture.component';

@Component({
    selector: 'app-edit-club',
    templateUrl: './edit-club.component.html',
    styleUrls: ['./edit-club.component.css']
})
export class EditClubComponent implements OnInit{
    club: ClubEditResponse;
    viewDate: Date = new Date();
    events: CalendarEvent[] = []
    pictures: PictureIndexResponseItem[] = []
    galleryPage = 0;
    galleryPageSize = 6;
    pictureTotal: number;
    loading = true;

    constructor(
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private clubService: ClubService,
        private sessionService: SessionService,
        private pictureService: PictureService,
        private router: Router
    ){}

    ngOnInit(){
        const id = +this.route.snapshot.paramMap.get('id');
        this.editClub(id);
    }

    editClub(id: number){
        this.clubService.edit(id).subscribe((clubEditResponse) => {
            this.club = clubEditResponse;
            this.sessionIndex();
            this.pictureIndex();
        }, (error) => {
            alert(error.message);
        });
    }

    sessionIndex(){
        this.sessionService.index(this.club.id).subscribe((sessionIndexResponse) => {
            this.events = sessionIndexResponse.map<CalendarEvent>((sessionIndexResponseItem) => {
                return {
                    title: sessionIndexResponseItem.practice.activity,
                    start: moment().startOf('week').add(sessionIndexResponseItem.day, 'days').add(moment.duration(sessionIndexResponseItem.start)).toDate(),
                    end: moment().startOf('week').add(sessionIndexResponseItem.day, 'days').add(moment.duration(sessionIndexResponseItem.end)).toDate(),
                    color: {
                        primary: '#ad2121',
                        secondary: '#FAE3E3',
                    },
                    actions: [
                        {
                            label: '<i class="material-icons">edit</i>',
                            a11yLabel: 'Editar',
                            onClick: () => {
                                this.router.navigate([`/clubs/${this.club.id}/practices/${sessionIndexResponseItem.practice.id}/edit`]);
                            }
                        }
                    ]
                };
            });
            this.loading = false;
        }, (error) => {
            alert(error.message);
        });
    }

    pictureIndex(){
        this.pictureService.index(this.club.gallery_id, this.galleryPage, this.galleryPageSize).subscribe((pictureIndexResponse) => {
            this.pictures = pictureIndexResponse.pictures;
            this.pictureTotal = pictureIndexResponse.total;
            this.loading = false;
        }, (error) => {
            alert(error.message);
        });
    }

    openEditClubInfoDialog(){
        const dialogRef = this.dialog.open(EditClubInfoComponent, {
            width: '500px',
            data: this.club
        });

        dialogRef.afterClosed().subscribe((club) => {
            if(club){
                this.club.name = club.name;
                this.club.contact_name = club.contact_name;
                this.club.contact_email = club.contact_email;
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
                galleryId: this.club.gallery_id
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

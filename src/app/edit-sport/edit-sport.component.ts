import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import '../create-coach/create-coach.component';
import {CreateCoachComponent} from '../create-coach/create-coach.component';
import {ActivatedRoute} from '@angular/router';
import {CoachIndexResponseItem} from '../models/coach';
import {CoachService} from '../services/coach.service';
import {CreatePictureComponent} from '../create-picture/create-picture.component';
import {SportService} from '../services/sport.service';
import {SportShowResponse} from '../models/sport';
import {PictureIndexResponseItem} from '../models/picture';
import {PictureService} from '../services/picture.service';
import {EditSportInfoComponent} from '../edit-sport-info/edit-sport-info.component';
import {EditSportImageComponent} from '../edit-sport-image/edit-sport-image.component';
import {EditSportManualComponent} from '../edit-sport-manual/edit-sport-manual.component';
import {EditCoachComponent} from '../edit-coach/edit-coach.component';

@Component({
    selector: 'app-edit-sport',
    templateUrl: './edit-sport.component.html',
    styleUrls: ['./edit-sport.component.css']
})
export class EditSportComponent implements OnInit{
    sport: SportShowResponse;
    imageUrl = '';
    coaches: CoachIndexResponseItem[];
    pictures: PictureIndexResponseItem[] = []
    galleryPage = 0;
    galleryPageSize = 6;
    pictureTotal: number;
    loading = true;

    constructor(
        public dialog: MatDialog,
        private route: ActivatedRoute,
        private coachService: CoachService,
        private sportService: SportService,
        private pictureService: PictureService
    ){}

    ngOnInit(){
        const id = +this.route.snapshot.paramMap.get('id');
        this.imageUrl = `https://special-olympics-api.herokuapp.com/sports/${id}/image?${this.getTimestamp()}`;
        this.showSport(id);
    }

    showSport(id: number){
        this.sportService.show(id).subscribe((sportShowResponse) => {
            this.sport = sportShowResponse;
            this.pictureIndex();
            this.coachIndex();
        }, (error) => {
            alert(error.message);
        });
    }

    pictureIndex(){
        this.pictureService.index(this.sport.gallery_id, this.galleryPage, this.galleryPageSize).subscribe((pictureIndexResponse) => {
            this.pictures = pictureIndexResponse.pictures;
            this.pictureTotal = pictureIndexResponse.total;
            this.loading = false;
        }, (error) => {
            alert(error.message);
        });
    }

    coachIndex(){
        this.coachService.index(this.sport.id).subscribe((coachIndexResponse) => {
            this.coaches = coachIndexResponse;
            this.loading = false;
        }, (error) => {
            alert(error.message);
        });
    }

    destroyCoach(id: number){
        this.coachService.destroy(id).subscribe(() => {
            this.coaches = this.coaches.filter((coach) => {
                return coach.id != id;
            });
        }, (error) => {
            alert(error.message)
        })
    }

    openCreateCoachDialog(){
        const dialogRef = this.dialog.open(CreateCoachComponent, {
            width: '500px',
            data: {
                id: this.sport.id
            }
        });

        dialogRef.afterClosed().subscribe((coach) => {
            if(coach){
                this.coaches.push(coach);
            }
        });
    }

    openCreatePictureDialog(){
        const dialogRef = this.dialog.open(CreatePictureComponent, {
            width: '500px',
            data: {
                galleryId: this.sport.gallery_id
            }
        });

        dialogRef.afterClosed().subscribe((picture) => {
            if(picture){
                this.pictureIndex();
            }
        });
    }

    openEditSportInfoDialog(){
        const dialogRef = this.dialog.open(EditSportInfoComponent, {
            width: '500px',
            data: {
                id: this.sport.id,
                name: this.sport.name,
                description: this.sport.description,
                notes: this.sport.notes,
                contact_name: this.sport.contact_name,
                contact_email: this.sport.contact_email,
                contact_phone: this.sport.contact_phone,
                locations: [...this.sport.locations]
            }
        });

        dialogRef.afterClosed().subscribe((sport) => {
            if(sport){
                this.sport.name = sport.name;
                this.sport.description = sport.description;
                this.sport.notes = sport.notes;
                this.sport.contact_name = sport.contact_name;
                this.sport.contact_email = sport.contact_email;
                this.sport.contact_phone = sport.contact_phone;
                this.sport.locations = sport.locations;
            }
        });
    }

    openEditSportImageDialog(){
        const dialogRef = this.dialog.open(EditSportImageComponent, {
            width: '500px',
            data: {
                sportId: this.sport.id
            }
        });

        dialogRef.afterClosed().subscribe(() => {
            this.imageUrl = `https://special-olympics-api.herokuapp.com/sports/${this.sport.id}/image?${this.getTimestamp()}`;
        });
    }

    openEditSportManualDialog(){
        const dialogRef = this.dialog.open(EditSportManualComponent, {
            width: '500px',
            data: {
                sportId: this.sport.id
            }
        });
    }

    openEditCoachDialog(id: number){
        const coach = this.coaches.find((coach) => {
            return coach.id == id
        });

        const dialogRef = this.dialog.open(EditCoachComponent, {
            width: '500px',
            data: coach
        });

        dialogRef.afterClosed().subscribe((updatedCoach) => {
            if(updatedCoach){
                coach.name = updatedCoach.name;
                coach.email = updatedCoach.email;
                coach.phone = updatedCoach.phone;
            }
        });
    }

    getTimestamp(){
        return new Date().getTime();
    }

    changeGalleryPage(event){
        this.galleryPage = event.pageIndex;
        this.pictureIndex();
    }

    destroyPicture(id: number){
        this.pictureService.destroy(id).subscribe(() => {
            this.pictureIndex();
        }, (error) => {
            alert(error.message);
        });
    }
}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {Router, ActivatedRoute} from '@angular/router';

import {ClubUpdateRequest, ClubEditResponse} from '../models/club'
import {ClubService} from '../services/club.service';
import {CreateAvailableSportComponent} from '../create-available-sport/create-available-sport.component';

@Component({
    selector: 'app-edit-club-info',
    templateUrl: './edit-club-info.component.html',
    styleUrls: ['./edit-club-info.component.css']
})
export class EditClubInfoComponent implements OnInit{
    club: ClubEditResponse;
    updateClubForm = this.fb.group({
        name: ['', Validators.required],
        contact_name: ['', Validators.required],
        contact_email: ['', Validators.required]
    });
    availableSports = [];
    alert = '&nbsp;'

    constructor(
        private fb: FormBuilder,
        private clubService: ClubService,
        private router: Router,
        public dialog: MatDialog,
        private route: ActivatedRoute
    ){}

    ngOnInit(){
        const id = +this.route.snapshot.paramMap.get('id');
        this.editClub(id);
    }

    editClub(id: number){
        this.clubService.edit(id).subscribe((clubEditResponse) => {
            this.club = clubEditResponse;
            this.updateClubForm.setValue({
                name: clubEditResponse.name,
                contact_name: clubEditResponse.contact_name,
                contact_email: clubEditResponse.contact_email
            });

            this.availableSports = clubEditResponse.available_sports;
        });
    }

    openCreateAvailableSportDialog(){
        const dialogRef = this.dialog.open(CreateAvailableSportComponent, {
            width: '500px'
        });

        dialogRef.afterClosed().subscribe((availableSport) => {
            if(availableSport){
                this.availableSports.push(availableSport);
            }
        });
    }

    removeAvailableSport(item){
        this.availableSports = this.availableSports.filter((availableSport) => {
            return availableSport != item;
        });
    }

    updateClub(){
        if(this.availableSports.length == 0){
            this.alert = 'Agregue deportes disponibles';
            return;
        }

        const clubUpdateRequest: ClubUpdateRequest = {
            ...this.updateClubForm.value,
            available_sports: this.availableSports
        };

        this.clubService.update(this.club.id, clubUpdateRequest).subscribe(() => {
            this.router.navigate([`/clubs/${this.club.id}/edit`]);
        }, (error) => {
            this.alert = error.message;
        });
    }
}

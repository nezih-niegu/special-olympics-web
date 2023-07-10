import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {ClubStoreRequest} from '../models/club';
import {ClubService} from '../services/club.service';
import {CreateAvailableSportComponent} from '../create-available-sport/create-available-sport.component';

@Component({
    selector: 'app-create-club',
    templateUrl: './create-club.component.html',
    styleUrls: ['./create-club.component.css']
})
export class CreateClubComponent implements OnInit{
    municipalityId: number;
    storeClubForm = this.fb.group({
        name: ['', Validators.required],
        contact_name: ['', Validators.required],
        contact_email: ['', Validators.required]
    });
    availableSports = [];
    alert = '&nbsp;'

    constructor(
        private route: ActivatedRoute,
        private fb: FormBuilder,
        private clubService: ClubService,
        private router: Router,
        public dialog: MatDialog
    ){}

    ngOnInit(){
        this.municipalityId = +this.route.snapshot.paramMap.get('id');
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

    storeClub(){
        if(this.availableSports.length == 0){
            this.alert = 'Agregue deportes disponibles';
            return;
        }

        const clubStoreRequest: ClubStoreRequest = {
            ...this.storeClubForm.value,
            available_sports: this.availableSports
        };

        this.clubService.store(this.municipalityId, clubStoreRequest).subscribe(() => {
            this.router.navigate([`/clubs`]);
        }, (error) => {
            this.alert = error.message;
        });
    }
}
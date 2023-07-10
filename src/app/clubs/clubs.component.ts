import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';

import {MunicipalityIndexResponseItem} from '../models/municipality';
import {MunicipalityService} from '../services/municipality.service';
import {CreateMunicipalityComponent} from '../create-municipality/create-municipality.component';
import {ClubIndexResponseItem} from '../models/club';
import {ClubService} from '../services/club.service';

@Component({
    selector: 'app-clubs',
    templateUrl: './clubs.component.html',
    styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit{
    municipalities: MunicipalityIndexResponseItem[] = [];
    municipalityId: number;
    clubs: ClubIndexResponseItem[] = [];
    total: number;
    page = 0;
    pageSize = 10;

    @ViewChild('paginator', {
        static: false
    }) paginator: MatPaginator;

    constructor(
        private municipalityService: MunicipalityService,
        public dialog: MatDialog,
        private clubService: ClubService
    ){}

    ngOnInit(){
        this.municipalityIndex();
    }

    municipalityIndex(){
        this.municipalityService.index().subscribe((municipalityIndexResponse) => {
            this.municipalities = municipalityIndexResponse;
        }, (error) => {
            alert(error.message);
        });
    }

    openCreateMunicipalityDialog(){
        const dialogRef = this.dialog.open(CreateMunicipalityComponent, {
            width: '500px'
        });

        dialogRef.afterClosed().subscribe((municipality) => {
            if(municipality){
                this.municipalities.push(municipality);
            }
        });
    }

    selectMunicipality(){
        this.page = 0;
        this.paginator.firstPage();
        this.clubIndex();
    }

    clubIndex(){
        this.clubService.index(this.municipalityId, this.page, this.pageSize).subscribe((clubIndexResponse) => {
            this.clubs = clubIndexResponse.clubs;
            this.total = clubIndexResponse.total;
        }, (error) => {
            alert(error.message);
        });
    }

    changePage(event){
        this.page = event.pageIndex;
        this.clubIndex();
    }

    destroyClub(id: number){
        this.clubService.destroy(id).subscribe(() => {
            this.clubIndex();
        }, (error) => {
            alert(error.message);
        });
    }
}

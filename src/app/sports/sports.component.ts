import {Component, OnInit} from '@angular/core';

import {SportIndexResponseItem} from '../models/sport'
import {SportService} from '../services/sport.service'

@Component({
    selector: 'app-sports',
    templateUrl: './sports.component.html',
    styleUrls: ['./sports.component.css']
})
export class SportsComponent implements OnInit{
    sports: SportIndexResponseItem[];
    total: number;
    page = 0;
    pageSize = 6;
    loading = true;

    constructor(
        private sportService: SportService
    ){}

    ngOnInit(){
        this.sportIndex();
    }

    sportIndex(){
        this.sportService.index(this.page, this.pageSize).subscribe((sportIndexResponse) => {
            this.sports = sportIndexResponse.sports;
            this.total = sportIndexResponse.total;
            this.loading = false;
        }, (error) => {
            alert(error.message);
        });
    }

    changePage(event){
        this.page = event.pageIndex;
        this.sportIndex();
    }

    destroySport(id: number){
        this.sportService.destroy(id).subscribe(() => {
            this.sportIndex();
        }, (error) => {
            alert(error.message);
        })
    }
}

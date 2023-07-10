import {Component, OnInit} from '@angular/core';

import {ProgramIndexResponseItem} from '../models/program';
import {ProgramService} from '../services/program.service';

@Component({
    selector: 'app-programs',
    templateUrl: './programs.component.html',
    styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {
    programs: ProgramIndexResponseItem[];
    total: number;
    page = 0;
    pageSize = 6;
    loading = true;

    constructor(
        private programService: ProgramService
    ){}

    ngOnInit(){
        this.programIndex();
    }

    changePage(event){
        this.page = event.pageIndex;
        this.programIndex();
    }

    programIndex(){
        this.programService.index(this.page, this.pageSize).subscribe((programIndexResponse) => {
            this.programs = programIndexResponse.programs;
            this.total = programIndexResponse.total;

            this.loading = false;
        }, (error) => {
            alert(error.message);
            this.loading = false;
        });
    }

    destroyProgram(id: number){
        this.programService.destroy(id).subscribe(() => {
            this.programIndex();
        }, (error) => {
            alert(error.message);
        });
    }
}

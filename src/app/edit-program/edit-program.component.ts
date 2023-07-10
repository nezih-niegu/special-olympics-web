import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {ProgramEditResponse} from '../models/program';
import {EditProgramInfoComponent} from '../edit-program-info/edit-program-info.component';
import {EditProgramImageComponent} from '../edit-program-image/edit-program-image.component';
import {ProgramService} from '../services/program.service';
import {EditProgramManualComponent} from '../edit-program-manual/edit-program-manual.component';

@Component({
    selector: 'app-edit-program',
    templateUrl: './edit-program.component.html',
    styleUrls: ['./edit-program.component.css']
})
export class EditProgramComponent implements OnInit{
    program: ProgramEditResponse;
    imageUrl = '';
    loading = true;

    constructor(
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private programService: ProgramService
    ){}

    ngOnInit(){
        const id = +this.route.snapshot.paramMap.get('id');
        this.imageUrl = `https://special-olympics-api.herokuapp.com/programs/${id}/image?${this.getTimestamp()}`;
        this.editProgram(id);
    }

    getTimestamp(){
        return new Date().getTime();
    }

    openEditProgramInfoDialog(){
        const dialogRef = this.dialog.open(EditProgramInfoComponent, {
            width: '500px',
            data: this.program
        });

        dialogRef.afterClosed().subscribe((program) => {
            if(program){
                this.program.name = program.name,
                this.program.description = program.description
            }
        });
    }

    openEditProgramImageDialog(){
        const dialogRef = this.dialog.open(EditProgramImageComponent, {
            width: '500px',
            data: {
                id: this.program.id
            }
        });

        dialogRef.afterClosed().subscribe((updated) => {
            if(updated){
                this.imageUrl = `https://special-olympics-api.herokuapp.com/programs/${this.program.id}/image?${this.getTimestamp()}`;
            }
        });
    }

    openEditProgramManualDialog(){
        const dialogRef = this.dialog.open(EditProgramManualComponent, {
            width: '500px',
            data: {
                id: this.program.id
            }
        });
    }

    editProgram(id: number){
        this.programService.edit(id).subscribe((programEditResponse) => {
            this.program = programEditResponse;
            this.loading = false;
        }, (error) => {
            alert(error.message);
            this.loading = false;
        });
    }
}

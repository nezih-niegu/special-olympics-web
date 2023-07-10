import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';

import {CreateSessionComponent} from '../create-session/create-session.component';
import {PracticeEditResponse, PracticeUpdateRequest} from '../models/practice';
import {PracticeService} from '../services/practice.service';

@Component({
    selector: 'app-edit-practice',
    templateUrl: './edit-practice.component.html',
    styleUrls: ['./edit-practice.component.css']
})
export class EditPracticeComponent implements OnInit{
    clubId: number;
    practice: PracticeEditResponse;
    updatePracticeForm = this.fb.group({
        activity: ['', Validators.required]
    });
    sessions = [];
    days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    alert = '&nbsp;';

    constructor(
        private fb: FormBuilder,
        public dialog: MatDialog,
        private practiceService: PracticeService,
        private route: ActivatedRoute,
        private router: Router
    ){}

    ngOnInit(){
        this.clubId = +this.route.snapshot.paramMap.get('clubId');
        const id = +this.route.snapshot.paramMap.get('id');
        this.editPractice(id);
    }

    editPractice(id: number){
        this.practiceService.edit(id).subscribe((practiceEditResponse) => {
            this.practice = practiceEditResponse;
            this.updatePracticeForm.setValue({
                activity: practiceEditResponse.activity
            });
            this.sessions = this.practice.sessions.map((session) => {
                return {
                    day: session.day,
                    start: moment().startOf('day').add(moment.duration(session.start)).format('HH:mm'),
                    end: moment().startOf('day').add(moment.duration(session.end)).format('HH:mm'),
                }
            });
        }, (error) => {
            this.alert = error.message;
        });
    }

    openCreateSessionDialog(){
        const dialogRef = this.dialog.open(CreateSessionComponent, {
            width: '500px'
        });

        dialogRef.afterClosed().subscribe((session) => {
            if(session){
                this.sessions.push(session);
            }
        });
    }

    removeSession(item){
        this.sessions = this.sessions.filter((session) => {
            return session != item;
        });
    }

    updatePractice(){
        if(this.sessions.length == 0){
            this.alert = 'Agregue horarios al entrenamiento';
            return;
        }

        const practiceUpdateRequest: PracticeUpdateRequest = {
            ...this.updatePracticeForm.value,
            sessions: this.sessions
        };

        this.practiceService.update(this.practice.id, practiceUpdateRequest).subscribe(() => {
            this.router.navigate([`/clubs/${this.clubId}/edit`]);
        }, (error) => {
            this.alert = error.message;
        });
    }

    destroyPractice(){
        this.practiceService.destroy(this.practice.id).subscribe(() => {
            this.router.navigate([`/clubs/${this.clubId}/edit`]);
        }, (error) => {
            this.alert = error.message;
        });
    }
}

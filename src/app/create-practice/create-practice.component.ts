import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {CreateSessionComponent} from '../create-session/create-session.component';
import {PracticeStoreRequest} from '../models/practice';
import {PracticeService} from '../services/practice.service';

@Component({
    selector: 'app-create-practice',
    templateUrl: './create-practice.component.html',
    styleUrls: ['./create-practice.component.css']
})
export class CreatePracticeComponent implements OnInit{
    clubId: number;
    storePracticeForm = this.fb.group({
        activity: ['', Validators.required]
    });
    sessions = [];
    days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    alert = '&nbsp;'

    constructor(
        public dialog: MatDialog,
        private fb: FormBuilder,
        private practiceService: PracticeService,
        private route: ActivatedRoute,
        private router: Router
    ){}

    ngOnInit(){
        this.clubId = +this.route.snapshot.paramMap.get('id');
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

    storePractice(){
        if(this.sessions.length == 0){
            this.alert = 'Agregue horarios al entrenamiento';
            return;
        }

        const practiceStoreRequest: PracticeStoreRequest = {
            ...this.storePracticeForm.value,
            sessions: this.sessions
        };

        this.practiceService.store(this.clubId, practiceStoreRequest).subscribe(() => {
            this.router.navigate([`/clubs/${this.clubId}/edit`]);
        }, (error) => {
            this.alert = error.message;
        });
    }
}

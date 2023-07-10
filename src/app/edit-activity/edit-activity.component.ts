import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {ActivityEditResponse} from '../models/activity';
import {EditActivityInfoComponent} from '../edit-activity-info/edit-activity-info.component';
import {EditActivityImageComponent} from '../edit-activity-image/edit-activity-image.component';
import {ActivityService} from '../services/activity.service';

@Component({
    selector: 'app-edit-activity',
    templateUrl: './edit-activity.component.html',
    styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit{
    activity: ActivityEditResponse;
    imageUrl = '';

    constructor(
        private route: ActivatedRoute,
        public dialog: MatDialog,
        public activityService: ActivityService
    ){}

    ngOnInit(){
        const id = +this.route.snapshot.paramMap.get('id');
        this.imageUrl = `https://special-olympics-api.herokuapp.com/activities/${id}/image?${this.getTimestamp()}`;
        this.editActivity(id);
    }

    editActivity(id: number){
        this.activityService.edit(id).subscribe((activityEditResponse) => {
            this.activity = activityEditResponse;
        }, (error) => {
            alert(error.message);
        });
    }

    getTimestamp(){
        return new Date().getTime();
    }

    openEditActivityInfoDialog(){
        const dialogRef = this.dialog.open(EditActivityInfoComponent, {
            width: '500px',
            data: this.activity
        });

        dialogRef.afterClosed().subscribe((activity) => {
            if(activity){
                this.activity.name = activity.name,
                this.activity.description = activity.description
            }
        });
    }

    openEditActivityImageDialog(){
        const dialogRef = this.dialog.open(EditActivityImageComponent, {
            width: '500px',
            data: {
                id: this.activity.id
            }
        });

        dialogRef.afterClosed().subscribe((updated) => {
            if(updated){
                this.imageUrl = `https://special-olympics-api.herokuapp.com/activities/${this.activity.id}/image?${this.getTimestamp()}`;
            }
        });
    }
}

import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import {ActivityIndexResponseItem} from '../models/activity';
import {ActivityService} from '../services/activity.service';
import {EditActivityComponent} from '../edit-activity/edit-activity.component';

@Component({
    selector: 'app-activities',
    templateUrl: './activities.component.html',
    styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit{
    activities: ActivityIndexResponseItem[];
    total: number;
    page = 0;
    pageSize = 6;

    constructor(
        private activityService: ActivityService,
        public dialog: MatDialog
    ){}

    ngOnInit(){
        this.activityIndex();
    }

    activityIndex(){
        this.activityService.index(this.page, this.pageSize).subscribe((activityIndexResponse) => {
            this.activities = activityIndexResponse.activities;
            this.total = activityIndexResponse.total
        }, (error) => {
            alert(error.message);
        });
    }

    changePage(event){
        this.page = event.pageIndex;
        this.activityIndex();
    }

    openEditActivityDialog(id: number){
        const dialogRef = this.dialog.open(EditActivityComponent, {
            width:  '500px',
            data: {
                id
            }
        });

        dialogRef.afterClosed().subscribe((wasUpdated) => {
            if(wasUpdated){
                this.activityIndex();
            }
        });
    }

    destroyActivity(id: number){
        this.activityService.destroy(id).subscribe(() => {
            this.activityIndex();
        }, (error) => {
            alert(error);
        });
    }
}

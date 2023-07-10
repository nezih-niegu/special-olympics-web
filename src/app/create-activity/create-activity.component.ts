import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {ActivityStoreRequest} from '../models/activity';
import {ActivityService} from '../services/activity.service';

@Component({
    selector: 'app-create-activity',
    templateUrl: './create-activity.component.html',
    styleUrls: ['./create-activity.component.css']
})
export class CreateActivityComponent implements OnInit{
    storeActivityForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
    });
    image: File = null;
    alert = '&nbsp;';

    constructor(
        private fb: FormBuilder,
        private activityService: ActivityService,
        private router: Router
    ){}

    ngOnInit(){
    }

    updateImage(files: FileList){
        this.image = files.item(0);
    }

    storeActivity(activityStoreRequest: ActivityStoreRequest){
        this.activityService.store(activityStoreRequest).subscribe((activityStoreResponse) => {
            this.activityService.storeImage(activityStoreResponse.id, this.image).subscribe(() => {
                this.router.navigate(['/activities']);
            }, (error) => {
                this.activityService.destroy(activityStoreResponse.id).subscribe(() => {
                    this.alert = error.message;
                }, (error) => {
                    this.alert = error.message;
                });
            })
        }, (error) => {
            this.alert = error.message;
        });
    }
}

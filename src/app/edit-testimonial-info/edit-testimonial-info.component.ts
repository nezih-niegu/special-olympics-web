import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';

import {TestimonialUpdateRequest} from '../models/testimonial';
import {TestimonialService} from '../services/testimonial.service';

export interface DialogData{
    id: number;
    title: string;
    content: string;
    type: number;
}

@Component({
    selector: 'app-edit-testimonial-info',
    templateUrl: './edit-testimonial-info.component.html',
    styleUrls: ['./edit-testimonial-info.component.css']
})
export class EditTestimonialInfoComponent implements OnInit{
    updateTestimonialForm = this.fb.group({
        title: [this.data.title, Validators.required],
        content: [this.data.content, Validators.required],
        type: [this.data.type, Validators.required]
    });
    alert = '&nbsp;';

    constructor(
        public dialogRef: MatDialogRef<EditTestimonialInfoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private fb: FormBuilder,
        private testimonialService: TestimonialService
    ){}

    ngOnInit(){
    }

    onCancel(){
        this.dialogRef.close();
    }

    updateTestimonial(testimonialUpdateRequest: TestimonialUpdateRequest){
        this.testimonialService.update(this.data.id, testimonialUpdateRequest).subscribe(() => {
            this.dialogRef.close(testimonialUpdateRequest);
        }, (error) => {
            this.alert = error.message;
        })
    }
}

import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {TestimonialService} from '../services/testimonial.service';

export interface DialogData{
    id: number;
}

@Component({
    selector: 'app-edit-testimonial-image',
    templateUrl: './edit-testimonial-image.component.html',
    styleUrls: ['./edit-testimonial-image.component.css']
})
export class EditTestimonialImageComponent implements OnInit{
    image: File = null;
    alert = '&nbsp;';

    constructor(
        public dialogRef: MatDialogRef<EditTestimonialImageComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private testimonialService: TestimonialService
    ){}

    ngOnInit(){
    }

    onCancel(){
        this.dialogRef.close();
    }

    updateImage(files: FileList){
        this.image = files.item(0);
    }

    updateTestimonialImage(){
        this.testimonialService.storeImage(this.data.id, this.image).subscribe(() => {
            this.dialogRef.close(true);
        }, (error) => {
            this.alert = error.message;
        });
    }
}

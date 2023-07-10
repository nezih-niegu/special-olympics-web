import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {TestimonialStoreRequest} from '../models/testimonial';
import {TestimonialService} from '../services/testimonial.service';

@Component({
    selector: 'app-create-testimonial',
    templateUrl: './create-testimonial.component.html',
    styleUrls: ['./create-testimonial.component.css']
})
export class CreateTestimonialComponent implements OnInit {
    storeTestimonialForm = this.fb.group({
        title: ['', Validators.required],
        content: ['', Validators.required],
        type: ['', Validators.required]
    });
    image: File = null;
    alert = '&nbsp;';

    constructor(
        private fb: FormBuilder,
        private testimonialService: TestimonialService,
        private router: Router
    ) {}

    ngOnInit(){
    }

    updateImage(files: FileList) {
        this.image = files.item(0);
    }

    storeTestimonial(testimonialStoreRequest: TestimonialStoreRequest){
        this.testimonialService.store(testimonialStoreRequest).subscribe((testimonialStoreResponse) => {
            this.testimonialService.storeImage(testimonialStoreResponse.id, this.image).subscribe(() => {
                this.router.navigate(['/testimonials']);
            }, (error) => {
                this.testimonialService.destroy(testimonialStoreResponse.id).subscribe(() => {
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

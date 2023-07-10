import {Component, OnInit} from '@angular/core';

import {TestimonialIndexResponseItem} from '../models/testimonial';
import {TestimonialService} from '../services/testimonial.service';

@Component({
    selector: 'app-testimonials',
    templateUrl: './testimonials.component.html',
    styleUrls: ['./testimonials.component.css']
})
export class TestimonialsComponent implements OnInit{
    testimonials: TestimonialIndexResponseItem[];
    total: number;
    page = 0;
    pageSize = 6;
    loading = true;

    constructor(
        private testimonialService: TestimonialService
    ){}

    ngOnInit(){
        this.testimonialIndex();
    }

    testimonialIndex(){
        this.testimonialService.index(this.page, this.pageSize).subscribe((testimonialIndexResponse) => {
            this.testimonials = testimonialIndexResponse.testimonials;
            this.total = testimonialIndexResponse.total;
            this.loading = false;
        }, (error) => {
            alert(error.message);
        });
    }

    changePage(event){
        this.page = event.pageIndex;
        this.testimonialIndex();
    }

    destroyTestimonial(id: number){
        this.testimonialService.destroy(id).subscribe(() => {
            this.testimonialIndex();
        }, (error) => {
            alert(error.message);
        });
    }
}

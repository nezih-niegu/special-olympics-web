import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {TestimonialEditResponse} from '../models/testimonial';
import {TestimonialService} from '../services/testimonial.service';
import {EditTestimonialInfoComponent} from '../edit-testimonial-info/edit-testimonial-info.component';
import {EditTestimonialImageComponent} from '../edit-testimonial-image/edit-testimonial-image.component';

@Component({
    selector: 'app-edit-testimonial',
    templateUrl: './edit-testimonial.component.html',
    styleUrls: ['./edit-testimonial.component.css']
})
export class EditTestimonialComponent implements OnInit{
    testimonial: TestimonialEditResponse;
    imageUrl = '';
    type = ['Familia', 'Atleta', 'Entrenador', 'Voluntario', 'Compañero unificado', 'Aliado'];
    loading = true;

    constructor(
        private route: ActivatedRoute,
        private testimonialService: TestimonialService,
        public dialog: MatDialog
    ){}

    ngOnInit(){
        const id = +this.route.snapshot.paramMap.get('id');
        this.imageUrl = `https://special-olympics-api.herokuapp.com/testimonials/${id}/image?${this.getTimestamp()}`;
        this.editTestimonial(id);
    }

    getTimestamp(){
        return new Date().getTime();
    }

    editTestimonial(id: number){
        this.testimonialService.edit(id).subscribe((testimonialEditResponse) => {
            this.testimonial = testimonialEditResponse;
            this.loading = false;
        }, (error) => {
            alert(error.message);
        });
    }

    openEditTestimonialInfoDialog(){
        const dialogRef = this.dialog.open(EditTestimonialInfoComponent, {
            width: '500px',
            data: this.testimonial
        });

        dialogRef.afterClosed().subscribe((testimonial) => {
            if(testimonial){
                this.testimonial.title = testimonial.title;
                this.testimonial.content = testimonial.content;
                this.testimonial.type = testimonial.type;
            }
        });
    }

    openEditTestimonialImageDialog(){
        const dialogRef = this.dialog.open(EditTestimonialImageComponent, {
            width: '500px',
            data: {
                id: this.testimonial.id
            }
        });

        dialogRef.afterClosed().subscribe((updated) => {
            if(updated){
                this.imageUrl = `https://special-olympics-api.herokuapp.com/testimonials/${this.testimonial.id}/image?${this.getTimestamp()}`;
            }
        });
    }
}

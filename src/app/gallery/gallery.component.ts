import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import {PictureIndexResponseItem} from '../models/picture';
import {PictureService} from '../services/picture.service';
import {CreatePictureComponent} from '../create-picture/create-picture.component';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit{
    id: number;
    name: string;
    pictures: PictureIndexResponseItem[];
    page = 0;
    pageSize = 6;
    total: number;
    
    constructor(
        private pictureService: PictureService,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ){}

    ngOnInit(){
        this.id = +this.route.snapshot.paramMap.get('id');
        this.pictureIndex();
    }

    pictureIndex(){
        this.pictureService.index(this.id, this.page, this.pageSize).subscribe((pictureIndexResponse) => {
            this.name = pictureIndexResponse.gallery_name;
            this.pictures = pictureIndexResponse.pictures;
            this.total = pictureIndexResponse.total;
        }, (error) => {
            alert(error.message);
        });
    }

    changePage(event){
        this.page = event.pageIndex;
        this.pictureIndex();
    }

    openCreatePictureDialog(){
        const dialogRef = this.dialog.open(CreatePictureComponent, {
            width: '500px',
            data: {
                galleryId: this.id
            }
        });

        dialogRef.afterClosed().subscribe((picture) => {
            if(picture){
                this.pictureIndex();
            }
        });
    }

    destroyPicture(id: number){
        this.pictureService.destroy(id).subscribe(() => {
            this.pictureIndex();
        }, (error) => {
            alert(error.message);
        });
    }
}

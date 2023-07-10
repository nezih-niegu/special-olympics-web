import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {ProgramService} from '../services/program.service';
import {ProgramStoreRequest} from '../models/program';

@Component({
    selector: 'app-create-program',
    templateUrl: './create-program.component.html',
    styleUrls: ['./create-program.component.css']
})
export class CreateProgramComponent implements OnInit{
    storeProgramForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
    });
    image: File = null;
    manual: File = null;
    alert = '&nbsp;';

    constructor(
        private fb: FormBuilder,
        private programService: ProgramService,
        private router: Router
    ){}

    ngOnInit(){
    }

    updateImage(files: FileList){
        this.image = files.item(0);
    }

    updateManual(files: FileList){
        this.manual = files.item(0);
    }

    storeProgram(programStoreRequest: ProgramStoreRequest){
        this.programService.store(programStoreRequest).subscribe((programStoreResponse) => {
            this.programService.storeImage(programStoreResponse.id, this.image).subscribe(() => {
                this.programService.storeManual(programStoreResponse.id, this.manual).subscribe(() => {
                    this.router.navigate(['/programs']);
                }, (error) => {
                    this.programService.destroy(programStoreResponse.id).subscribe(() => {
                        this.alert = error.message;
                    }, (error) => {
                        this.alert = error.message;
                    });
                });
            }, (error) =>{
                this.programService.destroy(programStoreResponse.id).subscribe(() => {
                    this.alert = error.message;
                }, (error) => {
                    this.alert = error.message;
                });
            });
        }, (error) => {
            this.alert = error.message;
        });
    }
}

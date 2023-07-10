import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestimonialInfoComponent } from './edit-testimonial-info.component';

describe('EditTestimonialInfoComponent', () => {
  let component: EditTestimonialInfoComponent;
  let fixture: ComponentFixture<EditTestimonialInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTestimonialInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTestimonialInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

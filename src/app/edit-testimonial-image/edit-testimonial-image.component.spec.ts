import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestimonialImageComponent } from './edit-testimonial-image.component';

describe('EditTestimonialImageComponent', () => {
  let component: EditTestimonialImageComponent;
  let fixture: ComponentFixture<EditTestimonialImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTestimonialImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTestimonialImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

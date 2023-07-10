import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActivityImageComponent } from './edit-activity-image.component';

describe('EditActivityImageComponent', () => {
  let component: EditActivityImageComponent;
  let fixture: ComponentFixture<EditActivityImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditActivityImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActivityImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

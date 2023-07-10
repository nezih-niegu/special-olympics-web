import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActivityInfoComponent } from './edit-activity-info.component';

describe('EditActivityInfoComponent', () => {
  let component: EditActivityInfoComponent;
  let fixture: ComponentFixture<EditActivityInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditActivityInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActivityInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

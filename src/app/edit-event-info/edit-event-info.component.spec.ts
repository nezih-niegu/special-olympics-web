import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEventInfoComponent } from './edit-event-info.component';

describe('EditEventInfoComponent', () => {
  let component: EditEventInfoComponent;
  let fixture: ComponentFixture<EditEventInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEventInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEventInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

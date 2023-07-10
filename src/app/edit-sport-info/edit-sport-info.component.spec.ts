import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSportInfoComponent } from './edit-sport-info.component';

describe('EditSportInfoComponent', () => {
  let component: EditSportInfoComponent;
  let fixture: ComponentFixture<EditSportInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSportInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSportInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSportManualComponent } from './edit-sport-manual.component';

describe('EditSportManualComponent', () => {
  let component: EditSportManualComponent;
  let fixture: ComponentFixture<EditSportManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSportManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSportManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

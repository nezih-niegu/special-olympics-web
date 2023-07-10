import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClubInfoComponent } from './edit-club-info.component';

describe('EditClubInfoComponent', () => {
  let component: EditClubInfoComponent;
  let fixture: ComponentFixture<EditClubInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditClubInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClubInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

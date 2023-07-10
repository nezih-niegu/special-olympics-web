import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSportImageComponent } from './edit-sport-image.component';

describe('EditSportImageComponent', () => {
  let component: EditSportImageComponent;
  let fixture: ComponentFixture<EditSportImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSportImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSportImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

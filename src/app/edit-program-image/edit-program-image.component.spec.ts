import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgramImageComponent } from './edit-program-image.component';

describe('EditProgramImageComponent', () => {
  let component: EditProgramImageComponent;
  let fixture: ComponentFixture<EditProgramImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProgramImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProgramImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

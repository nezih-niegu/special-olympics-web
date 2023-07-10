import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgramInfoComponent } from './edit-program-info.component';

describe('EditProgramInfoComponent', () => {
  let component: EditProgramInfoComponent;
  let fixture: ComponentFixture<EditProgramInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProgramInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProgramInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

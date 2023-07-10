import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProgramManualComponent } from './edit-program-manual.component';

describe('EditProgramManualComponent', () => {
  let component: EditProgramManualComponent;
  let fixture: ComponentFixture<EditProgramManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProgramManualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProgramManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

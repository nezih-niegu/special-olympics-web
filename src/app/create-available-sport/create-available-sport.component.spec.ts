import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAvailableSportComponent } from './create-available-sport.component';

describe('CreateAvailableSportComponent', () => {
  let component: CreateAvailableSportComponent;
  let fixture: ComponentFixture<CreateAvailableSportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAvailableSportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAvailableSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

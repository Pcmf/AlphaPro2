import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarterComponent } from './carter.component';

describe('CarterComponent', () => {
  let component: CarterComponent;
  let fixture: ComponentFixture<CarterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

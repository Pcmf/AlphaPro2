import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JP3Component } from './jp3.component';

describe('JP3Component', () => {
  let component: JP3Component;
  let fixture: ComponentFixture<JP3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JP3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JP3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

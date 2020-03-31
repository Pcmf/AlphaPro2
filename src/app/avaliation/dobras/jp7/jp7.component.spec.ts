import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JP7Component } from './jp7.component';

describe('JP7Component', () => {
  let component: JP7Component;
  let fixture: ComponentFixture<JP7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JP7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JP7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

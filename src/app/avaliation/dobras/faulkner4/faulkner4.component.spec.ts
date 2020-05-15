import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Faulkner4Component } from './faulkner4.component';

describe('Faulkner4Component', () => {
  let component: Faulkner4Component;
  let fixture: ComponentFixture<Faulkner4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Faulkner4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Faulkner4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

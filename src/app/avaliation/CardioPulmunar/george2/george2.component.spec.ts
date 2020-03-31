import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { George2Component } from './george2.component';

describe('George2Component', () => {
  let component: George2Component;
  let fixture: ComponentFixture<George2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ George2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(George2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

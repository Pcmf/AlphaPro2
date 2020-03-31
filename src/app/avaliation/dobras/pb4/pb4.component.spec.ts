import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PB4Component } from './pb4.component';

describe('PB4Component', () => {
  let component: PB4Component;
  let fixture: ComponentFixture<PB4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PB4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PB4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DW4Component } from './dw4.component';

describe('DW4Component', () => {
  let component: DW4Component;
  let fixture: ComponentFixture<DW4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DW4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DW4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

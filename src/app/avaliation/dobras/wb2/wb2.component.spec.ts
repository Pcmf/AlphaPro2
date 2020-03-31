import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WB2Component } from './wb2.component';

describe('WB2Component', () => {
  let component: WB2Component;
  let fixture: ComponentFixture<WB2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WB2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WB2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

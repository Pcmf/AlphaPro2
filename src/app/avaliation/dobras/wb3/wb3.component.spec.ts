import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WB3Component } from './wb3.component';

describe('WB3Component', () => {
  let component: WB3Component;
  let fixture: ComponentFixture<WB3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WB3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WB3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

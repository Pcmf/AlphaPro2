import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DEXAComponent } from './dexa.component';

describe('DEXAComponent', () => {
  let component: DEXAComponent;
  let fixture: ComponentFixture<DEXAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DEXAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DEXAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

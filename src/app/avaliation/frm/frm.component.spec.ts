import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FRMComponent } from './frm.component';

describe('FRMComponent', () => {
  let component: FRMComponent;
  let fixture: ComponentFixture<FRMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FRMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FRMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

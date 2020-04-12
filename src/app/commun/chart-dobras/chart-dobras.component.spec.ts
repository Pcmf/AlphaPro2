import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDobrasComponent } from './chart-dobras.component';

describe('ChartDobrasComponent', () => {
  let component: ChartDobrasComponent;
  let fixture: ComponentFixture<ChartDobrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartDobrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDobrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

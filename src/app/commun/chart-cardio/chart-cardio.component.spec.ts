import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCardioComponent } from './chart-cardio.component';

describe('ChartCardioComponent', () => {
  let component: ChartCardioComponent;
  let fixture: ComponentFixture<ChartCardioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartCardioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCardioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

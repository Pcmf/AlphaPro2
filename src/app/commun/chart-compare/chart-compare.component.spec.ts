import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCompareComponent } from './chart-compare.component';

describe('ChartCompareComponent', () => {
  let component: ChartCompareComponent;
  let fixture: ComponentFixture<ChartCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

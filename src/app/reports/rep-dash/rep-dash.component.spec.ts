import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepDashComponent } from './rep-dash.component';

describe('RepDashComponent', () => {
  let component: RepDashComponent;
  let fixture: ComponentFixture<RepDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

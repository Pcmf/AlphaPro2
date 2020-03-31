import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvDashComponent } from './av-dash.component';

describe('AvDashComponent', () => {
  let component: AvDashComponent;
  let fixture: ComponentFixture<AvDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

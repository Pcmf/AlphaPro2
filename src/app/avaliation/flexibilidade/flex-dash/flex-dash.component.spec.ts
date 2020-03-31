import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexDashComponent } from './flex-dash.component';

describe('FlexDashComponent', () => {
  let component: FlexDashComponent;
  let fixture: ComponentFixture<FlexDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

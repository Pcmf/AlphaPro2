import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegDashComponent } from './reg-dash.component';

describe('RegDashComponent', () => {
  let component: RegDashComponent;
  let fixture: ComponentFixture<RegDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

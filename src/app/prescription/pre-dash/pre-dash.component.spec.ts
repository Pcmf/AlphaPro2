import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreDashComponent } from './pre-dash.component';

describe('PreDashComponent', () => {
  let component: PreDashComponent;
  let fixture: ComponentFixture<PreDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

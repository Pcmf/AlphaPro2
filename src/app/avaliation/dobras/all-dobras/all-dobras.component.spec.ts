import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDobrasComponent } from './all-dobras.component';

describe('AllDobrasComponent', () => {
  let component: AllDobrasComponent;
  let fixture: ComponentFixture<AllDobrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllDobrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllDobrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

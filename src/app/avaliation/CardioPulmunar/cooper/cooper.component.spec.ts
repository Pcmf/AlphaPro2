import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperComponent } from './cooper.component';

describe('CooperComponent', () => {
  let component: CooperComponent;
  let fixture: ComponentFixture<CooperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CooperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CooperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

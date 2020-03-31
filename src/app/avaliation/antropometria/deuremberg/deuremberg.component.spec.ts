import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeurembergComponent } from './deuremberg.component';

describe('DeurembergComponent', () => {
  let component: DeurembergComponent;
  let fixture: ComponentFixture<DeurembergComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeurembergComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeurembergComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

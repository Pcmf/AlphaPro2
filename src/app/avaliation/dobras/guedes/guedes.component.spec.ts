import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuedesComponent } from './guedes.component';

describe('GuedesComponent', () => {
  let component: GuedesComponent;
  let fixture: ComponentFixture<GuedesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuedesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

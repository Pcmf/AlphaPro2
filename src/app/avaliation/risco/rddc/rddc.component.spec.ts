import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RDDCComponent } from './rddc.component';

describe('RDDCComponent', () => {
  let component: RDDCComponent;
  let fixture: ComponentFixture<RDDCComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RDDCComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RDDCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RockportComponent } from './rockport.component';

describe('RockportComponent', () => {
  let component: RockportComponent;
  let fixture: ComponentFixture<RockportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RockportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RockportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

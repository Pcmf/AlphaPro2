import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeltmanComponent } from './weltman.component';

describe('WeltmanComponent', () => {
  let component: WeltmanComponent;
  let fixture: ComponentFixture<WeltmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeltmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeltmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

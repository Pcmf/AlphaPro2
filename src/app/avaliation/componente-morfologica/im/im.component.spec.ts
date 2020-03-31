import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IMComponent } from './im.component';

describe('IMComponent', () => {
  let component: IMComponent;
  let fixture: ComponentFixture<IMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

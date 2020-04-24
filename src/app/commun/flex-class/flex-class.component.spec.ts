import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexClassComponent } from './flex-class.component';

describe('FlexClassComponent', () => {
  let component: FlexClassComponent;
  let fixture: ComponentFixture<FlexClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

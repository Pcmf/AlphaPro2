import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexitesteComponent } from './flexiteste.component';

describe('FlexitesteComponent', () => {
  let component: FlexitesteComponent;
  let fixture: ComponentFixture<FlexitesteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexitesteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexitesteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

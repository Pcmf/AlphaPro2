import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCardioComponent } from './dialog-cardio.component';

describe('DialogCardioComponent', () => {
  let component: DialogCardioComponent;
  let fixture: ComponentFixture<DialogCardioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCardioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCardioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

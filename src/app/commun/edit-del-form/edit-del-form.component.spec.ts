import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDelFormComponent } from './edit-del-form.component';

describe('EditDelFormComponent', () => {
  let component: EditDelFormComponent;
  let fixture: ComponentFixture<EditDelFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDelFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

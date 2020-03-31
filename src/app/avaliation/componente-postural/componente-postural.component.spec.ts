import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentePosturalComponent } from './componente-postural.component';

describe('ComponentePosturalComponent', () => {
  let component: ComponentePosturalComponent;
  let fixture: ComponentFixture<ComponentePosturalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentePosturalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentePosturalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

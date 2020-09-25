import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteOrtopedicosDashComponent } from './teste-ortopedicos-dash.component';

describe('TesteOrtopedicosDashComponent', () => {
  let component: TesteOrtopedicosDashComponent;
  let fixture: ComponentFixture<TesteOrtopedicosDashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteOrtopedicosDashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteOrtopedicosDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

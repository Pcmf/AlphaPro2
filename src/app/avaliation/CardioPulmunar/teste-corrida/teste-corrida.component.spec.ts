import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteCorridaComponent } from './teste-corrida.component';

describe('TesteCorridaComponent', () => {
  let component: TesteCorridaComponent;
  let fixture: ComponentFixture<TesteCorridaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteCorridaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteCorridaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

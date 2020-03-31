import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteBicicletaComponent } from './teste-bicicleta.component';

describe('TesteBicicletaComponent', () => {
  let component: TesteBicicletaComponent;
  let fixture: ComponentFixture<TesteBicicletaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteBicicletaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteBicicletaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

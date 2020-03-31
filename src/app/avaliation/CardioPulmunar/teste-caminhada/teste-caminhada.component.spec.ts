import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteCaminhadaComponent } from './teste-caminhada.component';

describe('TesteCaminhadaComponent', () => {
  let component: TesteCaminhadaComponent;
  let fixture: ComponentFixture<TesteCaminhadaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteCaminhadaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteCaminhadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestePiscinaComponent } from './teste-piscina.component';

describe('TestePiscinaComponent', () => {
  let component: TestePiscinaComponent;
  let fixture: ComponentFixture<TestePiscinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestePiscinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestePiscinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

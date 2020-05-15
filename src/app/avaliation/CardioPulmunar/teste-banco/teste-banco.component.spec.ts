import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteBancoComponent } from './teste-banco.component';

describe('TesteBancoComponent', () => {
  let component: TesteBancoComponent;
  let fixture: ComponentFixture<TesteBancoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteBancoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

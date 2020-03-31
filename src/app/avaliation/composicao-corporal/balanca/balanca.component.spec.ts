import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalancaComponent } from './balanca.component';

describe('BalancaComponent', () => {
  let component: BalancaComponent;
  let fixture: ComponentFixture<BalancaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalancaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

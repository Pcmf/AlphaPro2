import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NatacaoComponent } from './natacao.component';

describe('NatacaoComponent', () => {
  let component: NatacaoComponent;
  let fixture: ComponentFixture<NatacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NatacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NatacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YmcaBancoComponent } from './ymca-banco.component';

describe('YmcaBancoComponent', () => {
  let component: YmcaBancoComponent;
  let fixture: ComponentFixture<YmcaBancoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YmcaBancoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YmcaBancoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

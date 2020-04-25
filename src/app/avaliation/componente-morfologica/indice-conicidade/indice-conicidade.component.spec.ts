import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiceConicidadeComponent } from './indice-conicidade.component';

describe('IndiceConicidadeComponent', () => {
  let component: IndiceConicidadeComponent;
  let fixture: ComponentFixture<IndiceConicidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndiceConicidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiceConicidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

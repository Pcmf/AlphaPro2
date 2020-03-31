import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalkeWareComponent } from './balke-ware.component';

describe('BalkeWareComponent', () => {
  let component: BalkeWareComponent;
  let fixture: ComponentFixture<BalkeWareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalkeWareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalkeWareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

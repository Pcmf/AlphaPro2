import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranWeltmanComponent } from './tran-weltman.component';

describe('TranWeltmanComponent', () => {
  let component: TranWeltmanComponent;
  let fixture: ComponentFixture<TranWeltmanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranWeltmanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranWeltmanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeltmanEtAlComponent } from './weltman-et-al.component';

describe('WeltmanEtAlComponent', () => {
  let component: WeltmanEtAlComponent;
  let fixture: ComponentFixture<WeltmanEtAlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeltmanEtAlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeltmanEtAlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

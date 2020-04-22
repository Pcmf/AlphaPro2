import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MayhewEtAlComponent } from './mayhew-et-al.component';

describe('MayhewEtAlComponent', () => {
  let component: MayhewEtAlComponent;
  let fixture: ComponentFixture<MayhewEtAlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MayhewEtAlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MayhewEtAlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

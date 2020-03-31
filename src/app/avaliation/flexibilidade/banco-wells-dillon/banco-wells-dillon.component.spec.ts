import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoWellsDillonComponent } from './banco-wells-dillon.component';

describe('BancoWellsDillonComponent', () => {
  let component: BancoWellsDillonComponent;
  let fixture: ComponentFixture<BancoWellsDillonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancoWellsDillonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoWellsDillonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

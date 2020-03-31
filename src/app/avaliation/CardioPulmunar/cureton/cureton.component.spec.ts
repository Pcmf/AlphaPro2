import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuretonComponent } from './cureton.component';

describe('CuretonComponent', () => {
  let component: CuretonComponent;
  let fixture: ComponentFixture<CuretonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuretonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuretonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

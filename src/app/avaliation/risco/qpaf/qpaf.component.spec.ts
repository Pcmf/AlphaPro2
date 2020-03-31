import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QPAFComponent } from './qpaf.component';

describe('QPAFComponent', () => {
  let component: QPAFComponent;
  let fixture: ComponentFixture<QPAFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QPAFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QPAFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

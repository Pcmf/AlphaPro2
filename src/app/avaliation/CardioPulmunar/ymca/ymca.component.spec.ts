import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YMCAComponent } from './ymca.component';

describe('YMCAComponent', () => {
  let component: YMCAComponent;
  let fixture: ComponentFixture<YMCAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YMCAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YMCAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

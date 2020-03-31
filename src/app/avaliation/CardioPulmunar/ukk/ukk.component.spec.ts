import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UKKComponent } from './ukk.component';

describe('UKKComponent', () => {
  let component: UKKComponent;
  let fixture: ComponentFixture<UKKComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UKKComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UKKComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

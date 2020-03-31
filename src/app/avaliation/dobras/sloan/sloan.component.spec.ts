import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SloanComponent } from './sloan.component';

describe('SloanComponent', () => {
  let component: SloanComponent;
  let fixture: ComponentFixture<SloanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SloanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SloanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

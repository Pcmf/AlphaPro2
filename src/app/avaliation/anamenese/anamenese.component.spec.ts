import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnameneseComponent } from './anamenese.component';

describe('AnameneseComponent', () => {
  let component: AnameneseComponent;
  let fixture: ComponentFixture<AnameneseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnameneseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnameneseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IRCQComponent } from './ircq.component';

describe('IRCQComponent', () => {
  let component: IRCQComponent;
  let fixture: ComponentFixture<IRCQComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IRCQComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IRCQComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VogelComponent } from './vogel.component';

describe('VogelComponent', () => {
  let component: VogelComponent;
  let fixture: ComponentFixture<VogelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VogelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VogelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoniometroComponent } from './goniometro.component';

describe('GoniometroComponent', () => {
  let component: GoniometroComponent;
  let fixture: ComponentFixture<GoniometroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoniometroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoniometroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

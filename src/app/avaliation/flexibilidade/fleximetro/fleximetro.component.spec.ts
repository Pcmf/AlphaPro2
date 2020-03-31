import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleximetroComponent } from './fleximetro.component';

describe('FleximetroComponent', () => {
  let component: FleximetroComponent;
  let fixture: ComponentFixture<FleximetroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleximetroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleximetroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

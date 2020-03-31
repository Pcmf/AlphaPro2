import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaugtherComponent } from './slaugther.component';

describe('SlaugtherComponent', () => {
  let component: SlaugtherComponent;
  let fixture: ComponentFixture<SlaugtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlaugtherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlaugtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

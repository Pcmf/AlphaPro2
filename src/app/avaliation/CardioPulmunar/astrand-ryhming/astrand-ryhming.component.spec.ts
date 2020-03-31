import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstrandRyhmingComponent } from './astrand-ryhming.component';

describe('AstrandRyhmingComponent', () => {
  let component: AstrandRyhmingComponent;
  let fixture: ComponentFixture<AstrandRyhmingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstrandRyhmingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstrandRyhmingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

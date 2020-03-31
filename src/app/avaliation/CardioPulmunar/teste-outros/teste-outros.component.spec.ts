import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesteOutrosComponent } from './teste-outros.component';

describe('TesteOutrosComponent', () => {
  let component: TesteOutrosComponent;
  let fixture: ComponentFixture<TesteOutrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesteOutrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesteOutrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

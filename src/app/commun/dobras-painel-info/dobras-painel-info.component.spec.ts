import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DobrasPainelInfoComponent } from './dobras-painel-info.component';

describe('DobrasPainelInfoComponent', () => {
  let component: DobrasPainelInfoComponent;
  let fixture: ComponentFixture<DobrasPainelInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DobrasPainelInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DobrasPainelInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

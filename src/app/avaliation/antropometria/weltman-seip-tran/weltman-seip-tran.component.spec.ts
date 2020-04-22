import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeltmanSeipTranComponent } from './weltman-seip-tran.component';

describe('WeltmanSeipTranComponent', () => {
  let component: WeltmanSeipTranComponent;
  let fixture: ComponentFixture<WeltmanSeipTranComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeltmanSeipTranComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeltmanSeipTranComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

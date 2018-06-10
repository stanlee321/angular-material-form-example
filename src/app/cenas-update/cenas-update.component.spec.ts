import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CenasUpdateComponent } from './cenas-update.component';

describe('CenasUpdateComponent', () => {
  let component: CenasUpdateComponent;
  let fixture: ComponentFixture<CenasUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CenasUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CenasUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

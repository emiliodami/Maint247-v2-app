import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceTenPage } from './finance-ten.page';

describe('FinanceTenPage', () => {
  let component: FinanceTenPage;
  let fixture: ComponentFixture<FinanceTenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceTenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceTenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

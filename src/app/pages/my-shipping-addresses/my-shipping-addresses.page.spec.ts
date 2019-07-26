import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyShippingAddressesPage } from './my-shipping-addresses.page';

describe('MyShippingAddressesPage', () => {
  let component: MyShippingAddressesPage;
  let fixture: ComponentFixture<MyShippingAddressesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyShippingAddressesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyShippingAddressesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

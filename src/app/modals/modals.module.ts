import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditShippingAddressModal } from './edit-shipping-address/edit-shipping-address.page';
import { ForgotPasswordModal } from './forgot-password/forgot-password.page';
import { LanguageModal } from './language/language.page';
import { LoginModal } from './login/login.page';        
import { PrivacyPolicyModal } from './privacy-policy/privacy-policy.page';
import { RefundPolicyModal } from './refund-policy/refund-policy.page';
import { SelectCountryModal } from './select-country/select-country.page';
import { SelectZonesModal } from './select-zones/select-zones.page';
import { SignUpModal } from './sign-up/sign-up.page';
import { TermServicesModal } from './term-services/term-services.page';

@NgModule({
  declarations: [
	EditShippingAddressModal,
	ForgotPasswordModal,
	LanguageModal,
	LoginModal,
	PrivacyPolicyModal,
	RefundPolicyModal,
	SelectCountryModal,
	SelectZonesModal,
	SignUpModal,
	TermServicesModal
  ],
  exports: [
  	EditShippingAddressModal,
	ForgotPasswordModal,
	LanguageModal,
	LoginModal,
	PrivacyPolicyModal,
	RefundPolicyModal,
	SelectCountryModal,
	SelectZonesModal,
	SignUpModal,
	TermServicesModal
  ],
  imports: [
    CommonModule
  ]
})
export class ModalsModule { }

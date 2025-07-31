import { Routes } from '@angular/router';
import { UserComponent } from './pages/user/user.component';
import { PaymentDetailsComponent } from './pages/payment-details/payment-details.component';
import { PaymentDetailFormComponent } from './pages/payment-detail-form/payment-detail-form.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      { path: 'signup', component: RegistrationComponent },
      { path: 'signin', component: LoginComponent },
    ],
  },
  { path: 'paymentdetail', component: PaymentDetailsComponent },
  { path: 'paymentdetailform', component: PaymentDetailFormComponent },
];

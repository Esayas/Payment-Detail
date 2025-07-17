import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaymentDetailFormComponent } from './pages/payment-detail-form/payment-detail-form.component';
import { PaymentDetailsComponent } from './pages/payment-details/payment-details.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PaymentDetailsComponent],
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'PaymentApp';
}

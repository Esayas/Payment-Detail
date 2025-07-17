import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../../services/payment-detail.service';
import { FormsModule, NgForm } from '@angular/forms';
import { PaymentDetail } from '../../model/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-form',
  imports: [FormsModule],
  templateUrl: './payment-detail-form.component.html',
  styles: ``,
})
export class PaymentDetailFormComponent implements OnInit {
  constructor(
    public service: PaymentDetailService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    // debugger;
    if (form.valid) {
      this.service.postPaymentDetail().subscribe({
        next: (res) => {
          // console.log(res);
          // this.service.refreshList();
          this.service.paymentList = res as PaymentDetail[];
          // this.service.resetForm(form);
          this.service.resetForm();
          this.toastr.success('Saved successfully', 'Payment Detail Register');
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}

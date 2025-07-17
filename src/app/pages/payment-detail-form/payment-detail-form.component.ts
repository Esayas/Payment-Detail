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
  // formSubmitted: boolean = false;
  constructor(
    public service: PaymentDetailService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.service.formSubmitted = true;
    // debugger;
    if (form.valid) {
      if (this.service.formData.paymentDetailId == 0) {
        this.insertRecord(form);
      } else {
        this.updateRecord(form);
      }
    }
  }

  insertRecord(form: NgForm) {
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

  updateRecord(form: NgForm) {
    this.service.putPaymentDetail().subscribe({
      next: (res) => {
        // console.log(res);
        // this.service.refreshList();
        this.service.paymentList = res as PaymentDetail[];
        // this.service.resetForm(form);
        this.service.resetForm();
        this.toastr.info('Update successfully', 'Payment Detail Register');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { PaymentDetailFormComponent } from '../payment-detail-form/payment-detail-form.component';
import { PaymentDetailService } from '../../services/payment-detail.service';
import { CommonModule } from '@angular/common';
import { PaymentDetail } from '../../model/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  imports: [PaymentDetailFormComponent, CommonModule],
  templateUrl: './payment-details.component.html',
  styles: ``,
})
export class PaymentDetailsComponent implements OnInit {
  constructor(
    public service: PaymentDetailService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: PaymentDetail) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this record?'))
      this.service.deletePaymentDetail(id).subscribe({
        next: (res) => {
          // console.log(res);
          // this.service.refreshList();
          this.service.paymentList = res as PaymentDetail[];
          // this.service.resetForm(form);
          this.service.resetForm();
          this.toastr.error('Deleted successfully', 'Payment Detail Register');
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { PaymentDetail } from '../model/payment-detail.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class PaymentDetailService {
  url: string = environment.apiBaseUrl + '/PaymentDetail';
  paymentList: PaymentDetail[] = [];
  formData: PaymentDetail = new PaymentDetail();
  formSubmitted: boolean = false;

  constructor(private http: HttpClient) {
    console.log('url');
  }

  refreshList() {
    this.http.get<PaymentDetail[]>(this.url).subscribe({
      next: (res) => {
        this.paymentList = res;
      },
      error: (err) => {},
    });
  }

  postPaymentDetail() {
    return this.http.post(this.url, this.formData);
  }

  putPaymentDetail() {
    return this.http.put(
      this.url + '/' + this.formData.paymentDetailId,
      this.formData
    );
  }

  deletePaymentDetail(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  // resetForm(form: NgForm) {
  //   form.form.reset();
  //   this.formData = new PaymentDetail();
  // }

  resetForm() {
    this.formSubmitted = false;
    this.formData = new PaymentDetail();
  }
}

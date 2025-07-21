import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FirstkeyPipe } from '../../shared/pipes/firstkey.pipe';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule, CommonModule, FirstkeyPipe],
  templateUrl: './registration.component.html',
  styles: ``,
})
export class RegistrationComponent {
  form!: FormGroup; // Declare it here
  isSubmitted: boolean = false;

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }

    return null;
  };

  constructor(
    public formBuilder: FormBuilder,
    private service: AuthService,
    private toastr: ToastrService
  ) {
    this.form = this.formBuilder.group(
      {
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // userForm: FormGroup = new FormGroup({
  //   fullName: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(3),
  //   ]),
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  //   confirmPassword: new FormControl(''),
  // });

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      this.service.createUser(this.form.value).subscribe({
        next: (res: any) => {
          if (res.succeeded) {
            this.form.reset();
            this.isSubmitted = false;
            this.toastr.success('New user created', 'Registration Success');
            console.log(this.form.value);
          } else {
            console.log('Code', 'TG');
          }
        },
        error: (err) => {
          if (err.error.errors) {
            err.error.errors.forEach((x: any) => {
              console.log('Code', x);
              switch (x.code) {
                case 'DuplicateUserName':
                  break;
                case 'DuplicateEmail':
                  this.toastr.error(
                    'Email is already taken',
                    'Registration Failed'
                  );
                  break;
                default:
                  this.toastr.error('Contact the Admin', 'Registration Failed');
                  console.log(x);
                  break;
              }
            });
          } else {
            console.log('error', err);
          }
        },
      });
    }
  }

  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return (
      Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { UserService } from '../services/user.service';
import { OptionConfig } from '../services/option-config';
import { ToastService } from '../services/toasty.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  regStep: number;
  sex  = new FormControl('', Validators.required);
  looking = new FormControl('', Validators.required);
  between = new FormControl('', Validators.required);
  living = new FormControl('', Validators.required);
  username = new FormControl('', Validators.required);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  education = new FormControl('', Validators.required);
  day = new FormControl('', Validators.required);
  month = new FormControl('', Validators.required);
  year = new FormControl('', Validators.required);
  kids = new FormControl('', Validators.required);
  region = new FormControl('', Validators.required);
  comuna = new FormControl('', Validators.required);
  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              public toast: ToastService,
              public option: OptionConfig) {}
  ngOnInit() {
    this.regStep = 1;
    this.registerForm = this.formBuilder.group({
      sex: this.sex,
      looking: this.looking,
      between: this.between,
      living: this.living,
      username: this.username,
      email: this.email,
      password: this.password,
      education: this.education,
      kids: this.kids,
      region: this.region,
      comuna: this.comuna,
      day: this.day,
      month: this.month,
      year: this.year
    });
  }
  register() {
      if (this.username.valid && this.email.valid && this.password.valid &&
          this.education.valid && this.kids.valid && this.region.valid && this.comuna.valid &&
          this.day.valid && this.month.valid && this.year.valid) {
        this.userService.register(this.registerForm.value).subscribe(
          res => {
            console.log(res);
            this.registerForm.reset();
            this.toast.success('You have successfully registered!');
            this.regStep = 1;
          },
          () => {
            this.toast.error('Username or email have already exists!');
          }
        );
      } else {
        this.toast.error('Please, fill all the fields!');
      }
  }
  checkValid1() {
    console.log(this.sex)
    if (this.sex.valid && this.looking.valid && this.between.valid && this.living.valid) {
      this.regStep = 2;
    } else {
      this.toast.error('Please, fill all the fields!');
    }
  }
  setDangerEmail() {
    return {'error-validate' : this.email.touched && this.email.errors.email };
  }
  setDangerPassword() {
    return {'error-validate' : this.password.touched && this.password.errors.minlength };
  }
}

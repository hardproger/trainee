import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ToastyService, ToastyConfig} from 'ng2-toasty';

import { UserService } from '../services/user.service';

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
  email = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  education = new FormControl('', Validators.required);
  kids = new FormControl('', Validators.required);
  region = new FormControl('', Validators.required);
  comuna = new FormControl('', Validators.required);
  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private toastyService: ToastyService,
              private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
    this.regStep = 1;
  }
  ngOnInit() {
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
    });
  }
  register() {
      if (this.username.valid && this.email.valid && this.password.valid &&
          this.education.valid && this.kids.valid && this.region.valid && this.comuna.valid) {
        this.userService.register(this.registerForm.value).subscribe(
          res => {
            console.log(res);
            this.registerForm.reset();
            this.toastyService.success(this.setOptions('Success', 'You have successfully registered!'));
            this.regStep = 1;
          },
          () => {
            this.toastyService.error(this.setOptions('Error', 'Username or email have already exists!'));
          }
        );
      } else {
        this.toastyService.error(this.setOptions('Error', 'Please, fill all the fields!'));
      }
  }
  checkValid1() {
    if (this.sex.valid && this.looking.valid && this.between.valid && this.living.valid) {
      this.regStep = 2;
    } else {
      this.toastyService.error(this.setOptions('Error', 'Please, fill all the fields!'));
    }
  }
  setOptions(title, msg) {
    return {
      title: title,
      msg: msg,
      showClose: true,
      timeout: 2500,
      theme: 'bootstrap'
    };
  }
}

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
  username = new FormControl('', Validators.required);
  password = new FormControl('', Validators.required);
  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private toastyService: ToastyService,
              private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
    this.regStep = 1;
  }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: this.username,
      password: this.password
    });
  }
  register() {
    if (this.regStep === 1) {
      this.regStep = 2;
    } else {
      this.userService.register(this.registerForm.value).subscribe(
        res => {
          console.log(res);
          this.registerForm.reset();
          this.toastyService.success(this.setOptions('Success', 'You have successfully registered!'));
          this.regStep = 1;
        },
        error => {
          this.toastyService.error(this.setOptions('Error', 'Username or email have already exists!'));
        }
      );
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

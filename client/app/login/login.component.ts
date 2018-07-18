import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastyService, ToastyConfig } from 'ng2-toasty';

import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.services';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username = new FormControl('', [Validators.email, Validators.required]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  constructor(private formBuilder: FormBuilder,
            private router: Router,
            private userService: UserService,
            private auth: AuthService,
            public toastyService: ToastyService,
            public toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
    username: this.username,
    password: this.password
    });
  }
  login() {
    this.auth.login(this.loginForm.value).subscribe(
      () => {
        this.router.navigate(['/home/list']);
        this.toastyService.success(this.setOptions('Success', 'You have successfully loggin in!'));
      },
      error => {
        console.log(error);
        this.toastyService.error(this.setOptions('Error', 'Username or password are invalid!'));
      }
    );
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
  setDangerEmail() {
    return {'error-validate' : this.username.touched && this.username.errors };
  }
  setDangerPassword() {
    return {'error-validate' : this.password.touched && this.password.errors };
  }
}

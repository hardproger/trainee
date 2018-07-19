import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.services';
import { ToastService } from '../services/toasty.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username = new FormControl('', [Validators.email, Validators.required]);
  password = new FormControl('', Validators.required);
  constructor(private formBuilder: FormBuilder,
            private router: Router,
            private userService: UserService,
            private auth: AuthService,
            public toast: ToastService) {}
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
        this.toast.success('You have successfully logged in!');
      },
      error => {
        console.log(error);
        this.toast.error('Username or password are invalid!');
      }
    );
  }
  setDangerEmail() {
    return {'error-validate' : this.username.touched && this.username.errors };
  }
  setDangerPassword() {
    return {'error-validate' : this.password.touched && this.password.errors };
  }
}

import { Injectable } from '@angular/core';
import { ToastyConfig, ToastyService } from 'ng2-toasty';

@Injectable()
export class ToastService {
  constructor(public toastyConfig: ToastyConfig,
              public toastyService: ToastyService) {
    this.toastyConfig.theme = 'bootstrap';
  }
  success(msg) {
    this.toastyService.success(this.setOptions('Success', msg));
  }
  error(msg) {
    this.toastyService.error(this.setOptions('Error', msg));
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

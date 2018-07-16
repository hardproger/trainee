import { Injectable } from '@angular/core';

@Injectable()
export class OptionConfig {
  days: Array<number> = [];
  educations: Array<string> = ['basic', 'general', 'higher'];
  kids: Array<string> = ['no', 'one', 'two', '3 and more'];
  comunas: Array<string> = ['las condes', 'caldera', 'huaro'];
  lookings: Array<string> = ['friends', 'dating', 'chat'];
  monthsNumbers: Array<number> = [];
  monthsNames: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June',
                                'July', 'August', 'September', 'October', 'November', 'December'];
  years: Array<number> = [];
  constructor() {
    for (let i = 1960; i <= 2018; i++) {
      this.years.push(i);
    }
    for (let i = 1; i <= 31; i++) {
      this.days.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      this.monthsNumbers.push(i);
    }
  }
}

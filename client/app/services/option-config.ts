import { Injectable } from '@angular/core';

@Injectable()
export class OptionConfig {
  days: Array<number> = [];
  educations: Array<string> = ['basic', 'general', 'higher'];
  kids: Array<string> = ['no', 'one', 'two', '3 and more'];
  comunas: Array<string> = ['las condes', 'caldera', 'huaro'];
  lookings: Array<string> = ['friends', 'dating', 'chat'];
  intereses: Array<string> = ['LOS ANIMALES', 'IR A EVENTOS CULTURALES', 'IR A CONCIERTOS',
                              'LA COMIDA SANA', 'HACER DEPORTES', 'VIAJAR', 'SALIR BAILAR',
                              'IR AL CINE', 'LA MUSICA', 'SALIR A CENAR']
  civils: Array<string> = ['soltero', 'relacion libre', 'casado'];
  jobs: Array<string> = ['administrativo', 'turizmo', 'medico'];
  religions: Array<string> = ['catolico', 'cristiano', 'musulmano'];
  choosings: Array<string> = ['no', 'yes'];
  weights: Array<number> = [];
  heights: Array<number> = [];
  bodys: Array<string> = ['delgado', 'atletico'];
  hairs: Array<string> = ['negro', 'rubio', 'calvo'];
  eyes: Array<string> = ['blue', 'green', 'brown'];
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
    for (let i = 140; i <= 220; i++) {
      this.heights.push(i);
    }
    for (let i = 40; i <= 200; i++) {
      this.weights.push(i);
    }
  }
}

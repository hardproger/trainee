import { Component } from '@angular/core';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-home',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  constructor(private auth: AuthService) {}
}

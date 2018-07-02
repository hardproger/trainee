import { Component } from '@angular/core';

import { AuthService } from '../services/auth.services';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.css']
})

export class AccountComponent {
	constructor(private auth: AuthService) {}
}
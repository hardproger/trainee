import { Component } from '@angular/core';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent {
  constructor(private auth: AuthService) {}
  images: Array<string> = [
    'https://datingchile.cl/dating-profile-photos/57/e4/88/57e4882f4b5bec00184ab2ea_1512217122860_small.jpg',
    'https://datingchile.cl/dating-profile-photos/57/99/2b/57992bc6a9a9248b1f12d07c_1511431234053_small.jpg',
    'https://datingchile.cl/dating-profile-photos/57/99/2b/57992bc6a9a9248b1f12e8ba_1489785613032_small.jpg',
    'https://datingchile.cl/dating-profile-photos/a2/19/84/a219847264a8b1c19e4f75ea70be3904_small.jpg',
    'https://datingchile.cl/dating-profile-photos/b7/37/66/b737669d35cd167faaf003e6cf13bec2_small.jpg',
    'https://datingchile.cl/dating-profile-photos/de/62/9d/de629db819f37e40f26bff38c7761e3e_small.jpg',
    'https://datingchile.cl/dating-profile-photos/d0/c6/0a/d0c60a2181e3dfa05b9ae15728740f3b_small.jpg',
    'https://datingchile.cl/dating-profile-photos/9f/77/90/9f779080bcd89479942d0491318b6bc6_small.jpg',
    'https://datingchile.cl/dating-profile-photos/59/e2/34/59e234d4a000d46c83bd3831_1528251602482_small.jpg',
    'https://datingchile.cl/dating-profile-photos/57/99/2b/57992bc6a9a9248b1f12d545_1508459784810_small.jpg',
    'https://datingchile.cl/dating-profile-photos/58/59/de/5859de7193587e00177c546b_1527993234110_small.jpg',
    'https://datingchile.cl/dating-profile-photos/58/31/30/58313041aaf0c200173c0dec_1506740724806_small.jpg'
  ]
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.services';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit{
  constructor(private auth: AuthService) {}
  ngOnInit() {
    // $('.carousel .carousel-item').each(function(){
    //   let next = $(this).next();
    //   if (!next.length) {
    //     next = $(this).siblings(':first');
    //   }
    //   next.children(':first-child').clone().appendTo($(this));
    //   for (let i = 0 ; i < 1 ; i++) {
    //     next = next.next();
    //     if (!next.length) {
    //       next = $(this).siblings(':first');
    //     }
    //     next.children(':first-child').clone().appendTo($(this));
    //   }
    // });
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-auth-layout',
    templateUrl: './auth-layout.component.html',
    styleUrls: ['./auth-layout.component.scss'],
    standalone: false
})
export class AuthLayoutComponent implements OnInit{
  isMobile = false;

  constructor() {}
  
  ngOnInit(): void {
    const mediaQuery = window.matchMedia('(max-width: 600px)');
    this.isMobile = mediaQuery.matches;

  mediaQuery.addEventListener('change', () => {
    this.isMobile = mediaQuery.matches;
  });
}

}

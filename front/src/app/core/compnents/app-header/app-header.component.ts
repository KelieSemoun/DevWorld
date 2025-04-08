import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  isMobile: boolean = false;
  currentUrl: string = '';

  @Output() menuClick = new EventEmitter<void>();

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.onResize();
    this.currentUrl = this.router.url;

    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(event => {
        this.currentUrl = event.urlAfterRedirects;
        this.onResize(); // Ensure mobile flag is up to date on navigation
      });
  }

  isAuthPage(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }
  

  onResize(): void {
    this.isMobile = window.innerWidth <= 768;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  
}

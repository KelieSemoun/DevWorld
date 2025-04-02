import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  isLogoOnly(): boolean {
    const currentUrl = this.router.url;
    return currentUrl === '/login' || currentUrl === '/register';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  goTo(path: string): void {
    this.router.navigate([path]);
  }
}
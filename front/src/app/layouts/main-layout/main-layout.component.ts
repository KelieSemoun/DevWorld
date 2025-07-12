import { Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrls: ['./main-layout.component.scss'],
    standalone: false
})
export class MainLayoutComponent {
  @ViewChild('drawer') drawer!: MatDrawer;

  constructor(private authService: AuthService, private router: Router) {}

  closeDrawer(): void {
    if (this.drawer.opened) {
      this.drawer.close();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    this.closeDrawer();
  }
}

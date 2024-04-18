import { Component } from '@angular/core';
import { AuthService } from './pages/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private router: Router,
    // private sessionService: SessionService
    ) {
  }

  // public $isLogged(): Observable<boolean> {
  //   return this.sessionService.$isLogged();
  // }

  // public logout(): void {
  //   this.sessionService.logOut();
  //   this.router.navigate([''])
  // }
}
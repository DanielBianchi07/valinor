import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  private readonly authService = inject(AuthService);
  private readonly routerService = inject(Router);

  get isLoggedIn() {
    return this.authService.token;
  }

  signOut() {
    this.authService.token = '';
    this.routerService.navigateByUrl('/login');
  }
}

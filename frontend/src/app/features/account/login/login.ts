import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { UserService } from '../../../shared/services/user.service';
import { ILogin, ILoginResponse } from '../../../shared/models/user.model';

@Component({
  selector: 'app-login',
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})

export class Login {
  private readonly userService = inject(UserService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  fb = inject(NonNullableFormBuilder);
  loginForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
  });

  login() {
    if(this.loginForm.invalid) return;

    this.userService
      .login(this.loginForm.value as ILogin)
      .subscribe((token: ILoginResponse) => {
        this.authService.token = token.accessToken;
        this.router.navigate(['/boards']);
      })
  }
}

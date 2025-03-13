import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const isLoggedIn = await authService.isAuthenticated();

  if (isLoggedIn) {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};


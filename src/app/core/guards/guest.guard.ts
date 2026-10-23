import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // If the user is ALREADY logged in, block them from the login page and send them to /home
  if (authService.isAuthenticated()) {
    return router.createUrlTree(['/home']);
  }

  // Otherwise, let them view the login page
  return true;
};
import { Inject, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const storage = localStorage.getItem('token');
  const router = inject(Router);
  return storage ? true : router.navigate(['/registro']);
};

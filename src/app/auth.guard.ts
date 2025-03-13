import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { UserService } from './services/user.service';
import { map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const userService=inject(UserService);
  const router=inject(Router);

  if (userService.loggedInUser()) {
    return of(true);
  } else {
    return userService.getAuthStatus().pipe(
      map(auth => {
        if (auth) {
          return true;
        } else {
          router.navigate(['/user/login'], {queryParams: {returnUrl: state.url}});
          return false;
        }
      })
    )
  }
};

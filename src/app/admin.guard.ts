import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const user = userService.loggedInUser();
  const role:string="admin";
  const router = inject(Router);

  if(user?.role==role){
    return true;
  }
  router.navigateByUrl("/");
  return false;
};

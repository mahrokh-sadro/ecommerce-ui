import { Directive, inject, ViewContainerRef, TemplateRef, effect } from '@angular/core';
import { UserService } from './services/user.service';

@Directive({
  selector: '[appIsAdmin]',
  standalone: true 
})
export class IsAdminDirective {
  role:string="admin";
 
  private userService = inject(UserService);
  private viewContainerRef = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef);

  constructor() {
      effect(() => {
        const user = this.userService.loggedInUser();
        if (user && user.role === this.role) {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainerRef.clear();
        }
      }); 

   }
}

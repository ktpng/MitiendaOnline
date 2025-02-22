import { Directive, ElementRef, OnInit, ViewContainerRef } from '@angular/core';
import { AuthService } from '../services/authService.service';

@Directive({
  selector: '[appCanDeleteProduct]',
  standalone: true,
})
export class CanDeleteProductDirective implements OnInit {
  constructor(
    private readonly el: ElementRef,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    const canDelete = this.authService.isAdminUser() && user?.city === 'Madrid';

    if (!canDelete) {
      this.el.nativeElement.remove();
    }
  }
}

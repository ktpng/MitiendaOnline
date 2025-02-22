import { Directive, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../services/authService.service';

@Directive({
  selector: '[appCanCreateProduct]',
  standalone: true,
})
export class CanCreateProductDirective implements OnInit {
  constructor(
    private readonly el: ElementRef,
    private readonly authService: AuthService
  ) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    const canCreate =
      this.authService.isAdminUser() && user?.city === 'Logroño';

    if (!canCreate) {
      this.el.nativeElement.style.display = 'none';
    }
  }
}

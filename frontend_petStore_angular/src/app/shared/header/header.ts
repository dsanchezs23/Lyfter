import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth-service';
import { CartService } from '../../core/services/cart';

@Component({
  imports: [RouterLink],
  standalone: true,
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {
  auth = inject(AuthService);
  cart = inject(CartService);
}

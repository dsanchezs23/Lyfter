import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'login', component: LogIn},
    {path: 'catalog', component: Catalog},
    {path: 'product/:id', component: ProductDetail},
    {path: 'cart', component: CartItem, canActivate: [authGuard]},
    {path: 'checkout', component: Checkout, canActivate: [authGuard]},
    {path: 'admin', component: AdminDashboard, canActivate: [authGuard]},
];

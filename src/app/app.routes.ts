import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Products } from './features/products/products/products';
import { ShoppingList } from './features/shopping-list/shopping-list/shopping-list';
import { Basket } from './features/basket/basket/basket';
import { NotFound } from './shared/components/not-found/not-found';
import { ConfirmEmail } from './features/auth/confirm-email/confirm-email';
import { guestGuard } from './core/guards/guest.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'register', component: Register, canActivate: [guestGuard] },

  { path: 'products', component: Products, canActivate: [authGuard] },
  { path: 'shopping-list', component: ShoppingList, canActivate: [authGuard] },
  { path: 'basket', component: Basket, canActivate: [authGuard] },
  { path: 'confirm-email', component: ConfirmEmail },

  { path: '**', component: NotFound },
];

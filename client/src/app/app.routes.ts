import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'event-list', component: EventListComponent, canActivate: [authGuard] },
  { path: 'event-form', component: EventFormComponent, canActivate: [authGuard] },
  { path: 'event-form/:id', component: EventFormComponent, canActivate: [authGuard] },
  // Alapértelmezett út: ha üres a cím, dobja a listára
  { path: '', redirectTo: '/event-list', pathMatch: 'full' },
  // Ha elgépel valamit (wildcard), szintén a listára vigye
  { path: '**', redirectTo: '/event-list' },
];

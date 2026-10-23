import { Routes } from '@angular/router';
import { HomePage } from './features/home-page/home-page';
import { LoginPage } from './features/login-page/login-page';
import { CreateUserPage } from './features/user-page/create-user-page/create-user-page';
import { UpdateUserPage } from './features/user-page/update-user-page/update-user-page';
import { authGuard } from './core/guards/auth.guard';
import { UserPage } from './features/user-page/user-page';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
    {
        path: '',
        component: LoginPage,
        canActivate: [guestGuard]
    },
    {
        path: 'home',
        component: HomePage,
        canActivate: [authGuard]
    },
    {
        path: 'create',
        component: CreateUserPage,
        canActivate: [authGuard]
    },
    {
        path: 'update',
        component: UpdateUserPage,
        canActivate: [authGuard]
    },
    {
        path: 'user-page',
        component: UserPage,
        canActivate: [authGuard]
    },
    {path: '**', redirectTo: ''},
];

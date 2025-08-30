import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./features/account/login/login').then(c => c.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/account/register/register').then(c => c.Register)
    },
    {
        path: 'boards',
        loadComponent: () => import('./features/boards/list/board-list').then(c => c.BoardList),
        canActivate: [authGuard]
    },
    {
        path: 'boards/:id',
        loadComponent: () => import('./features/boards/detail/board-detail').then(c => c.BoardDetail),
        canActivate: [authGuard]
    },
    {
        path: '**',
        redirectTo: 'login',
    }
];

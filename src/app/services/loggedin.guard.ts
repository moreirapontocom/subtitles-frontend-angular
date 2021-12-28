import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()

export class LoggedInGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var isLoggedIn = await this.authService.getUser();
        if (!isLoggedIn) {
            this.router.navigate(['/auth/login']);
            return false;
        }

        return true;
    }

}
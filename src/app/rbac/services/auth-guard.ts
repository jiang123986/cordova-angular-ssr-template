import { Injectable, Injector } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { find } from 'lodash';
import { environment } from './../../../environments/environment';
import { BaseUniversal } from 'src/app/base-universal';


/**
 * 路由守卫
 *
 * @export
 * @class AuthGuard
 * @implements {CanActivate}
 * @implements {CanActivateChild}
 */
@Injectable({ providedIn: 'root' })
export class AuthGuard extends BaseUniversal implements CanActivate, CanActivateChild, CanLoad {
  constructor(
    public authService: AuthService,
    public router: Router,
    public injector: Injector) {
    super(injector);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(state.url);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.canActivate(childRoute, state);
  }

  checkLogin(url: string) {
    if (this.isServer) {
      return;
    }
    if (this.authService.isLoggedIn || this.authService.user.token) {
      return true;
    }
    this.authService.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }

  checkModule(route: Route) {
    if (this.isServer) {
      return;
    }
    if (route.path === environment.layout || find(this.authService.user.permissions?.menus, (x) => x.router === route.path)) {
      return true;
    }
    this.router.navigate([`${environment.layout}/no-auth`]);
    return false;
  }

  canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
    let url = `/${route.path}`;
    return this.checkLogin(url) && this.checkModule(route);
  }
}

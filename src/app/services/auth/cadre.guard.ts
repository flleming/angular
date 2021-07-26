import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { AuthService } from "./auth.service";

@Injectable()
export class CadreGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    // const isAuth = this.authService.getIsAuth();
    // const role = this.authService.getAuthData().role ;
    // if (!isAuth) {
    //   this.router.navigate(['/login']);
    // }
    // else if(role=="admin"){
    //   this.router.navigate(['app/etudiants']);
    // }
    // else if(role=="enseignant"){
    //   this.router.navigate(['app/espace_en']);
    // }
    // else if(role=="etudiant"){
    //   this.router.navigate(['app/espace_et']);
    // }
    // return isAuth;
  return true
  }
}

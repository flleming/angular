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
export class AuthGuard implements CanActivate {
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
    // else if(role=="etudiant"){
    //   console.log("oui1")
    //   this.router.navigate(['app/espace_et']);
    // }
    // else if(role=="enseignant"){
    //   console.log("oui12")

    //   this.router.navigate(['app/espace_en']);
    // }
    // else if(role=="cadre"){
    //   console.log("oui13")

    //   this.router.navigate(['app/espace_c']);
    // }
    // return isAuth;
    return true
  }
}

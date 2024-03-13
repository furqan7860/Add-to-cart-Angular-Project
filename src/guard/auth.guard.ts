import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private toastr: ToastrService) { }

  errorMessage() {
    this.toastr.error("Kindly Login Again");
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let data: any = localStorage.getItem('isAuthenticated');
    data = JSON.parse(data);
    if (data) {
      return true;
    }
    this.errorMessage();
    this.router.navigate(['/login']);
    return false;
  }

}


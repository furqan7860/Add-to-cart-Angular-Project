import { Component, OnInit, DoCheck } from '@angular/core';
import { Login } from 'src/app/class/login';
import { FormControl, NgForm, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private toastr: ToastrService) { }

  login: Login = new Login();
  loginArray = new Array<any>();
  public isAuthenticated = false;
  hide = true;
  check: boolean = false
  public data: any;

  get checkEmptyField()
  {
    return (this.login.email == '' || this.login.password == '') ? true : false;
  }
  ngOnInit(): void {
    this.data = localStorage.getItem("signUpData");
    this.data = JSON.parse(this.data);
    localStorage.setItem("isAuthenticated", JSON.stringify(this.isAuthenticated));
  }
  successmsg() {
    this.toastr.success("Log In Successfully")
  }

  errorMessage() {

    this.toastr.error("Invalid Credentials");
  }


  onSubmit(f: NgForm) {
    if (f.invalid) return;
    const isChecked = this.data?.find((value: any) => {
      return value.email == this.login.email && value.password == this.login.password
    });


    if (isChecked) {

      this.isAuthenticated = true;
      localStorage.setItem("isAuthenticated", JSON.stringify(this.isAuthenticated))
      this.successmsg();
      this.router.navigate(["/products"]);
    }
    else {

      this.isAuthenticated = false;
      localStorage.setItem("isAuthenticated", JSON.stringify(this.isAuthenticated))
      this.errorMessage();
    }
    f.reset();
  }

}


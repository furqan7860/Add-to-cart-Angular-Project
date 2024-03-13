import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Signup } from 'src/app/class/signup';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{

  signup:Signup=new Signup();
  public hide=true;
  public hide2=true;
  signupArray:any[] =[];
  constructor(private router:Router,private toaster:ToastrService){}

  ngOnInit() :void
  {
    let getData:any=localStorage.getItem("signUpData");
    if(getData)
    {
      getData=JSON.parse(getData);
    this.signupArray=getData;
    }
  }
  infoUser()
  {
    this.toaster.success("Congrats for Registeration")
  }

  onSubmit(f: NgForm) {
    const valueExist=this.signupArray.find((x)=>x.email==f.value.email);
    if(valueExist)
    {
      this.toaster.error("Sorry Your email is already exists");
      f.reset();
      return;
    }
    this.signupArray.push(f.value);
    localStorage.setItem("signUpData",JSON.stringify(this.signupArray))
    f.reset();
    this.router.navigate(['/login']);
    this.infoUser();

  }
  
}

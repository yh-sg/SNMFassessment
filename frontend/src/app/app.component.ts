import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  islogin:boolean = false

  constructor(private authSvc:AuthService,private router:Router){}

  ngOnInit(): void {
    // this.authSvc.autoLogin();
    if(this.authSvc.isLogin()===true){
      this.islogin = true
    }else{
      this.islogin = false
    }
  }

  logout(){
    this.authSvc.logout();
    this.router.navigate(['/login'])
  }

  

  title = 'frontend';
}
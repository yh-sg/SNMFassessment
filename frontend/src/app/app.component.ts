import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  // islogin:boolean = false

  public navbarCollapsed = true;

  public authToken: boolean;

  constructor(private authSvc:AuthService,private router:Router){
    this.authSvc.userLoggedIn.subscribe((token) => {
      if(token != null){
        this.authToken = true
      }else{
        this.authToken = false
      }
    })
  }

  ngOnInit(): void {
    // this.authSvc.autoLogin();

    // console.log(this.authToken)

    // if(this.authSvc.isLogin()===true){
    //   this.islogin = true
    // }else{
    //   this.islogin = false
    // }

    if(this.authSvc.isUserLoggedin()){
      this.authToken = true
    }else{
      this.authToken = false
    }

  }

  logout(){
    this.authSvc.logout();
    // window.alert(`Logged out!`)
    this.router.navigate(['/login'])
  }

  

  title = 'frontend';
}
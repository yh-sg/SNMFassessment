import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {

  constructor(private authSvc:AuthService,private router:Router){}

  ngOnInit(): void {
    // this.authSvc.autoLogin();
  }

  logout(){
    this.authSvc.logout();
    this.router.navigate(['/login'])
  }

  title = 'frontend';
}
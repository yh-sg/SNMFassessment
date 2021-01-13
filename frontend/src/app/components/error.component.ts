import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private router:Router, private AuthSvc:AuthService) { }

  ngOnInit(): void {
    
  }

  backtologin(){
    this.AuthSvc.logout();
    this.router.navigate(["/login"])
  }
}

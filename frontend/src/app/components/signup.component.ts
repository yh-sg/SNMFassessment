import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

declare const L: any

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  form:FormGroup

  constructor(private fb:FormBuilder, private router:Router, private authSvc:AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: this.fb.control('',[Validators.required]),
      password: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required]),
    })
  }

  signup(){
    console.log(this.form.value)
    this.authSvc.signup(this.form.get('username').value, this.form.get('password').value, this.form.get('email').value)
    .then(result=>{
      if(result==true){
        window.alert("User sign up successful")
        this.router.navigate(["/login"])
      }

      if(result==false){
        window.alert("Please try to signup again.")
      }
    })
    this.form.reset()
  }


}

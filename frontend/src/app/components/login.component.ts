import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form:FormGroup

  username

  constructor(private fb:FormBuilder, private router:Router, private authSvc:AuthService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: this.fb.control('',[Validators.required]),
      password: this.fb.control('', [Validators.required]),
    })
  }

  login(){
    console.log(this.form.value);
    this.username=this.form.get('username').value
    this.authSvc.login(this.form.get('username').value, this.form.get('password').value)
    .then(result=>{
      // console.log(result)
      if(result==true){
        this.router.navigate(["/home"])
        window.alert(`Logged in! Welcome,${this.username}`)
      }
      
      if(result==false){
        window.alert("The username or password is wrong.")
      }
    })
    this.form.reset()
  }

}

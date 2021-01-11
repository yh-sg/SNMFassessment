import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class AuthService implements CanActivate{

    private token = ''
    private payload = ""
    private headers = new HttpHeaders({'Content-Type': 'application/json'})

    constructor(private http:HttpClient, private router:Router){}

    login(username, password): Promise<Boolean> {
        // write a call to the backend
        //return the status code
        return this.http.post<any>('http://localhost:3000/auth/login',
            {username, password},{observe: 'response'})
            .toPromise()
            .then(res=>{
                console.log(res);
                if(res.status==200){
                    this.token = res.body.token
                    this.payload = res.body.payload.user.id
                    localStorage.setItem('id', this.payload)
                    localStorage.setItem('token', this.token);
                    // new HttpHeaders().append('auth-token', this.token)
                }
                return true
            }).catch(err=>{
                if(err.status==400){
                    //handle error
                }
                console.log(err);
                console.log(this.token);
                return false
            }) 
    }

    // autoLogin() {
    //         let userId = localStorage.getItem('id')
    //         let token = localStorage.getItem('token');
    //         console.log(userId)
    //     if (userId == "" || token == "") {
    //       return;
    //     }
    // }

    getID(){
        return localStorage.getItem('id');
    }
    
    logout(){
        localStorage.removeItem('id');
        localStorage.removeItem('token');
    }

    isLogin(){
        return (this.token != '' || (localStorage.getItem('token') != null))
    }

    canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if(this.isLogin()){
            console.log(this.isLogin());
            console.log(this.token);
            console.log(localStorage.getItem('token'));
            
            return true
        }
        console.log(this.token);
        console.log(localStorage.getItem('token'));
        console.log(this.isLogin());
        return this.router.parseUrl('/error')
    }
}
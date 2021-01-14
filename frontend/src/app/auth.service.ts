import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { nextTick } from "process";
import { Subject } from "rxjs";

@Injectable()
export class AuthService implements CanActivate{

    private token = ''
    private payload = ""
    private payload2 = ''
    private payload3 = ''

    public userLoggedIn = new Subject();

    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json','auth-token': localStorage.getItem('token')})
    };

    constructor(private http:HttpClient, private router:Router){}

    login(username, password): Promise<Boolean> {
        // write a call to the backend
        //return the status code
        return this.http.post<any>('auth/login',
            {username, password},{observe: 'response'})
            .toPromise()
            .then(res=>{
                console.log(res);
                if(res.status==200){
                    this.token = res.body.token
                    this.payload = res.body.payload.user.id
                    this.payload2 = res.body.payload.other.map
                    this.payload3 = res.body.payload.other.s3
                    localStorage.setItem('id', this.payload)
                    localStorage.setItem('token', this.token);
                    localStorage.setItem('map', this.payload2);
                    localStorage.setItem('s3', this.payload3);
                    this.userLoggedIn.next(this.token);
                    // console.log(res.body)
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

    signup(username, password, email):Promise<any>{
        return this.http.post<any>('auth/signup',
        {username, password, email},{observe: 'response'})
        .toPromise()
        .then(res=>{
            if(res.status==200){
            }
            return true
        }).catch(err=>{
            if(err.status==400){
                console.log(err);
            }
            return false
        }) 
    }

    getID(){
        return localStorage.getItem('id');
    }

    getMap(){
        return localStorage.getItem('map')
    }

    gets3(){
        return localStorage.getItem('s3')
    }

    //new method
    isUserLoggedin(){
        let authToken = localStorage.getItem('token')
        return (authToken != null ? true:false)
    }
    
    logout(){
        localStorage.removeItem('id');
        localStorage.removeItem('token');
        localStorage.removeItem('map');
        localStorage.removeItem('s3');
        this.userLoggedIn.next()
        this.userLoggedIn.complete()
    }

    isLogin(){
        return (this.token != '' || (localStorage.getItem('token') != null))
    }

    canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
        // if(this.isLogin()){
        if(this.isUserLoggedin()){
            // console.log(this.isLogin());
            // console.log(this.token);
            // console.log(localStorage.getItem('token'));
            
            return true
        }
        // console.log(this.token);
        // console.log(localStorage.getItem('token'));
        // console.log(this.isLogin());
        return this.router.parseUrl('/error')
    }
}
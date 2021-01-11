import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()

export class CurrService{
    httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
    };

    constructor(private http:HttpClient, private router:Router){}

    async getCurrencies(){
        const res = await this.http.get<any>('http://localhost:3000/currencies/list')
            .toPromise()
        
        // console.log(res)
        return res
    }

    async getRates(base){
        const res = await this.http.get<any>(`http://localhost:3000/currencies/rates?base=${base}`)
            .toPromise()
        
        // console.log(res)
        return res
    }

    async transaction(details){
        return await this.http.post<any>(`http://localhost:3000/main`,details, this.httpOptions)
            .toPromise
    }

}
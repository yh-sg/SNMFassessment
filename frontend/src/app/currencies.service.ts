import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()

export class CurrService{

    private token = ''

    // httpOptions = {
    //     headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
    //     // headers: new HttpHeaders({'Content-Type': 'multipart/form-data','auth-token': localStorage.getItem('token')})
    // };

    constructor(private http:HttpClient, private router:Router){}

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
      };

    async getCurrencies(){
        const res = await this.http.get<any>('currencies/list')
            .toPromise()
        
        // console.log(res)
        return res
    }

    async getRates(base){
        const res = await this.http.get<any>(`currencies/rates?base=${base}`)
            .toPromise()
        
        // console.log(res)
        return res
    }

    async getRatesWithDate(base,date){
        const res = await this.http.get<any>(`currencies/ratesInfo?date=${date}&base=${base}`)
            .toPromise()

        return res
    }

    async transaction(details){
        return await this.http.post<any>(`main`,details)
            .toPromise()
    }

    async showAlltransaction(id){
        const res = await this.http.get<any>(`main/${id}`)
            .toPromise()

        return res
    }

    async showOnetransaction(id){
        const res = await this.http.get<any>(`main/transaction/${id}`)
            .toPromise()
        // console.log(res)
        return res
    }

    // async delTransaction(id):Promise<any> {
    //     return await this.http.delete<any>(`http://localhost:3000/delTransaction/${id}`)
    //         .toPromise()
    // }

    // async getTransaction(details){
    //     return await this.http.post<any>(`http://localhost:3000/main`,details, this.httpOptions)
    //         .toPromise()
    // }

}
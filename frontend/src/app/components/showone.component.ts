import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CurrService } from '../currencies.service';

@Component({
  selector: 'app-showone',
  templateUrl: './showone.component.html',
  styleUrls: ['./showone.component.css']
})
export class ShowoneComponent implements OnInit {

  Id

  showOne:any[] = []

  /**************************/
  buySell
  amount
  convertAmt
  symbol
  createdDate
  createdTime
  uploadedImg
  s3
  /**************************/

  constructor(private activatedRoute: ActivatedRoute ,private router:Router, private CurrSvc:CurrService, private AuthSvc:AuthService) { }

  ngOnInit(): void {
    this.Id = this.activatedRoute.snapshot.params.id
    this.CurrSvc.showOnetransaction(this.Id)
    .then(result=>{
      this.showOne = result.transaction;
      this.buySell = result.transaction.buySell
      this.amount = result.transaction.amount
      this.convertAmt = result.transaction.convertedAmt
      this.symbol = result.transaction.symbol
      this.createdDate = result.transaction.createdDate.substring(0, 10)
      this.createdTime = result.transaction.createdDate.substring(11, 16)
      this.uploadedImg = result.transaction.filename
    })

    this.s3 = this.AuthSvc.gets3()

  }

  click(){
    console.log(this.showOne)
  }

  back(){
    this.router.navigate(['/home'])
  }

}

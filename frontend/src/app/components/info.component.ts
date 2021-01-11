import { Component, OnInit } from '@angular/core';
import { CurrService } from '../currencies.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  currencyList:any = []

  constructor(private currSvc:CurrService) { }

  ngOnInit(): void {
     this.currSvc.getCurrencies()
     .then(result=>{
       this.currencyList = result
      //  console.log(this.currencyList);
     })
  }

}

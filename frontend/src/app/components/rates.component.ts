import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CurrService } from '../currencies.service';

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.css']
})
export class RatesComponent implements OnInit {

  form:FormGroup

  base

  baseMoney

  rateLists:any = []

  unit:number = 0

  currencyList:any = []

  constructor(private fb:FormBuilder, private currSvc:CurrService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      base: this.fb.control('SGD'),
      baseMoney: this.fb.control(''),
      unit: this.fb.control("")
    })
    this.currSvc.getCurrencies()
    .then(result=>{
      this.currencyList = result
    })    
  }

  async gotobase(){
    this.base = this.form.value.base
    // console.log(this.base)
    await this.currSvc.getRates(this.form.value.base)
    .then(result=>{
      this.rateLists = result
    })
    console.log(this.rateLists)
    console.log(this.currencyList)
  }

}

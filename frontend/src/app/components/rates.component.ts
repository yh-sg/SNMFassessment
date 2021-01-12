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

  date

  todayDate = new Date()

  now = new Date();
  day = ("0" + this.now.getDate()).slice(-2);
  month = ("0" + (this.now.getMonth() + 1)).slice(-2);
  today = this.now.getFullYear()+"-"+(this.month)+"-"+(this.day);

  rateLists:any = []

  currencyList:any = []

  constructor(private fb:FormBuilder, private currSvc:CurrService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      base: this.fb.control('SGD'),
      date: this.fb.control(this.today),
    })
    this.currSvc.getCurrencies()
    .then(result=>{
      this.currencyList = result
    })    
  }

  async gotobase(){
    this.base = this.form.value.base
    this.date = this.form.value.date
    console.log(this.date)
    await this.currSvc.getRatesWithDate(this.form.value.base,this.form.value.date)
    .then(result=>{
      this.rateLists = result
    })
  }

}

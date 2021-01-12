import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CurrService } from '../currencies.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  form:FormGroup

  id // _id from mongoDB

  currencyList //List of the currency

  // exchangeRate:number

  rateLists:any[] = [] //Return all ratelist details
  rateListsSGD:any[] = [] //Return all rates using SGD as base

  amount:number = 1; //default amount, adjusts by user

  symbol //buying symbol for the customer
  symbolToAmt //the amount after converting
  convertedAmt:number //The amount that the user will get after buying

  @ViewChild('imageFile') imageFile: ElementRef;

  constructor(private authSvc:AuthService,private fb:FormBuilder,private currSvc:CurrService) { }

  ngOnInit(): void {
    this.id = this.authSvc.getID()

    this.currSvc.getCurrencies()
    .then(result=>{
      this.currencyList = result
      this.symbol = "USD"
    })   

    this.currSvc.getRates("SGD")
    .then(result=>{
      this.rateLists = result
      this.rateListsSGD = result.rates
      this.symbolToAmt = this.rateListsSGD["USD"]
    })

    this.form = this.fb.group({
      amount: this.fb.control('',[Validators.required, Validators.min(0)]),
      symbol: this.fb.control('USD', [Validators.required]),
      convertedAmt: this.fb.control(this.convertedAmt, [Validators.required]),
      //comment: this.fb.control('', [Validators.required]),
      filename: this.fb.control('', [Validators.required]),
      exchangeCreatedBy: this.fb.control(this.id, [Validators.required])
    })

    this.form.controls['symbol'].valueChanges.subscribe(change=>{
      this.symbol = change;
      console.log(this.symbol)
      console.log(this.rateListsSGD[this.symbol])
      this.symbolToAmt = this.rateListsSGD[this.symbol]
    })

    this.form.controls['amount'].valueChanges.subscribe(change=>{
      this.amount = change;
      // console.log(this.amount)
      // console.log(this.symbolToAmt)
      this.convertedAmt = this.symbolToAmt * this.amount
      // console.log(this.convertedAmt)
      this.form.controls['convertedAmt'].setValue(this.convertedAmt);
    })
    // console.log(this.currSvc.showAlltransaction(this.id))
  }

  submit(){
    const formData = new FormData();

    console.log(this.form.value)

    formData.set('amount', this.form.get('amount').value);
    formData.set('symbol', this.form.get('symbol').value);
    formData.set('convertedAmt', this.form.get('convertedAmt').value);
    formData.set('filename', this.imageFile.nativeElement.files[0]);
    formData.set('exchangeCreatedBy', this.form.get("exchangeCreatedBy").value);

    this.currSvc.transaction(formData)
  }

}

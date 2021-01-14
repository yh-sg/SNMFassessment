import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CurrService } from '../currencies.service';

declare const L:any

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  form:FormGroup

  buySell = "Buy"

  id // _id from mongoDB

  currencyList //List of the currency

  // exchangeRate:number

  rateLists:any[] = [] //Return all ratelist details
  rateListsSGD:any[] = [] //Return all rates using SGD as base

  amount:number = 1; //default amount, adjusts by user

  symbol //buying symbol for the customer
  symbolToAmt //the amount after converting
  convertedAmt:number //The amount that the user will get after buying

  map //map data
  lat
  lon

  // toggleClass:boolean = false;

  @ViewChild('imageFile') imageFile: ElementRef;

  constructor(private authSvc:AuthService,private fb:FormBuilder,private currSvc:CurrService,private router:Router) { }

  ngOnInit(): void {
    this.id = this.authSvc.getID()

    this.map = this.authSvc.getMap()

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
      buySell: this.fb.control('Buy',[Validators.required, Validators.min(0)]),
      amount: this.fb.control('',[Validators.required, Validators.min(0)]),
      symbol: this.fb.control('USD', [Validators.required]),
      convertedAmt: this.fb.control(this.convertedAmt, [Validators.required]),
      //comment: this.fb.control('', [Validators.required]),
      filename: this.fb.control('', [Validators.required]),
      exchangeCreatedBy: this.fb.control(this.id, [Validators.required])
    })

    this.form.controls['symbol'].valueChanges.subscribe(change=>{
      this.symbol = change;
      // console.log(this.symbol)
      // console.log(this.rateListsSGD[this.symbol])
      this.symbolToAmt = this.rateListsSGD[this.symbol]
      if(this.buySell=='Buy'){
        this.convertedAmt = this.symbolToAmt * this.amount
        }else{
          this.convertedAmt = this.amount / this.symbolToAmt
        }

        this.form.controls['convertedAmt'].setValue(this.convertedAmt);

    })

    this.form.controls['amount'].valueChanges.subscribe(change=>{
      this.amount = change;
      // console.log(this.amount)
      // console.log(this.symbolToAmt)
      if(this.buySell=='Buy'){
        this.convertedAmt = this.symbolToAmt * this.amount
      }else{
        this.convertedAmt = this.amount / this.symbolToAmt
      }
      // console.log(this.convertedAmt)
      this.form.controls['convertedAmt'].setValue(this.convertedAmt);
    })
    // console.log(this.currSvc.showAlltransaction(this.id))

    this.form.controls['buySell'].valueChanges.subscribe(change=>{
      this.buySell = change;
      console.log(this.buySell)
      if(this.buySell=='Buy'){
        this.convertedAmt = this.symbolToAmt * this.amount
        }else{
          this.convertedAmt = this.amount / this.symbolToAmt
        }
        // console.log(this.convertedAmt)
        this.form.controls['convertedAmt'].setValue(this.convertedAmt);
    })

    this.getlocation()
  }

  submit(){
    const formData = new FormData();

    console.log(this.form.value)

    formData.set('buySell', this.form.get('buySell').value);
    formData.set('amount', this.form.get('amount').value);
    formData.set('symbol', this.form.get('symbol').value);
    formData.set('convertedAmt', this.form.get('convertedAmt').value.toFixed(2));
    formData.set('filename', this.imageFile.nativeElement.files[0]);
    formData.set('exchangeCreatedBy', this.form.get("exchangeCreatedBy").value);
    formData.set('lat', this.lat);
    formData.set('lon', this.lon);

    this.currSvc.transaction(formData)

    window.alert("Transaction Success, we will contact you through email shortly. Thank you.")

    this.form.reset()

    this.router.navigate(['/home'])
  }

  back(){
    this.router.navigate(['/home'])
  }

  getlocation(){
    if(!navigator.geolocation){
      console.log('location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position)=>{
      const coord = position.coords;
      this.lat = coord.latitude
      this.lon = coord.longitude
      console.log(this.lat)
      console.log(this.lon)
      console.log(
        `lat: ${coord.latitude}, lon: ${coord.longitude}`
      )

      let mymap = L.map('map').setView([coord.latitude, coord.longitude], 13);

      L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${this.map}`, {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token'
      }).addTo(mymap);

      let marker = L.marker([coord.latitude, coord.longitude]).addTo(mymap);

      marker.bindPopup('<b>Delivery location</b>').openPopup();
    })
  }

}

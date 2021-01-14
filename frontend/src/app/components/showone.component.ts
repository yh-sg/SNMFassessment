import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CurrService } from '../currencies.service';

declare const L:any

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
  lat
  lon
  map
  trueFalse:boolean = false
  /**************************/

  constructor(private activatedRoute: ActivatedRoute ,private router:Router, private CurrSvc:CurrService, private AuthSvc:AuthService) { }

  ngOnInit(): void {
    this.Id = this.activatedRoute.snapshot.params.id
    this.map = this.AuthSvc.getMap()
    this.CurrSvc.showOnetransaction(this.Id)
    .then(result=>{
      this.showOne = result.transaction;
      this.buySell = result.transaction.buySell
      this.amount = result.transaction.amount
      this.convertAmt = result.transaction.convertedAmt
      this.symbol = result.transaction.symbol
      this.lat = result.transaction.lat
      this.lon = result.transaction.lon
      this.createdDate = result.transaction.createdDate.substring(0, 10)
      this.createdTime = result.transaction.createdDate.substring(11, 16)
      this.uploadedImg = result.transaction.filename
    })

    this.s3 = this.AuthSvc.gets3()

  }

  // click(){
  //   console.log(this.trueFalse)
  //   if(this.trueFalse===false){
  //     this.trueFalse = true;
  //   }else{
  //     this.trueFalse = false;
  //   }
  // }

  back(){
    this.router.navigate(['/home'])
  }

  // getlocation(){
  //   let mymap = L.map('map').setView([this.lon, this.lat], 13);

  //     L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${this.map}`, {
  //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //     maxZoom: 18,
  //     id: 'mapbox/streets-v11',
  //     tileSize: 512,
  //     zoomOffset: -1,
  //     accessToken: 'your.mapbox.access.token'
  //     }).addTo(mymap);

  //     let marker = L.marker([this.lon, this.lat]).addTo(mymap);

  //     marker.bindPopup('<b>Delivery location</b>').openPopup();
  // }

}

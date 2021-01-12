import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CurrService } from '../currencies.service';

@Component({
  selector: 'app-showall',
  templateUrl: './showall.component.html',
  styleUrls: ['./showall.component.css']
})
export class ShowallComponent implements OnInit {

  id

  showAllData:any = []

  constructor(private currSvc:CurrService, private authSvc:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.id = this.authSvc.getID()
    this.currSvc.showAlltransaction(this.id)
    .then(result=>{
      this.showAllData = result;
    })
  }

  goToBuyCurrency(){
    this.router.navigate(['/main'])
  }

  goToDetail(Id){
    console.log(Id)
    this.router.navigate(["/home", Id])
  }

  
}

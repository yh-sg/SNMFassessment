import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrService } from '../currencies.service';

@Component({
  selector: 'app-showone',
  templateUrl: './showone.component.html',
  styleUrls: ['./showone.component.css']
})
export class ShowoneComponent implements OnInit {

  Id

  showOne:any[] = []

  constructor(private activatedRoute: ActivatedRoute ,private router:Router, private CurrSvc:CurrService) { }

  ngOnInit(): void {
    this.Id = this.activatedRoute.snapshot.params.id
    this.CurrSvc.showOnetransaction(this.Id)
    .then(result=>{
      this.showOne = result.transaction;
    })
  }

  click(){
    console.log(this.showOne)
  }

  back(){
    this.router.navigate(['/home'])
  }

}

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

  id

  convertedAmt = 100

  @ViewChild('imageFile') imageFile: ElementRef;

  constructor(private authSvc:AuthService,private fb:FormBuilder,private currSvc:CurrService) { }

  ngOnInit(): void {
    this.id = this.authSvc.getID()
    this.form = this.fb.group({
      amount: this.fb.control('',[Validators.required, Validators.min(0)]),
      symbol: this.fb.control('', [Validators.required]),
      convertedAmt: this.fb.control(this.convertedAmt, [Validators.required]),
      //comment: this.fb.control('', [Validators.required]),
      filename: this.fb.control('', [Validators.required]),
      exchangeCreatedBy: this.fb.control(this.id, [Validators.required])
    })
    console.log(this.currSvc.showAlltransaction(this.id))
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

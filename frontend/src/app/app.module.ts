import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { MainComponent } from './components/main.component';
import { ErrorComponent } from './components/error.component';
import { AuthService } from './auth.service';
import { CurrService } from './currencies.service';
import { InfoComponent } from './components/info.component';
import { RatesComponent } from './components/rates.component';

const ROUTES = [
	{ path: 'login', component: LoginComponent },
	{ 
    path: 'main', component: MainComponent,
    canActivate: [AuthService]
  },
  { path: 'error', component: ErrorComponent },
  { path: 'info', component: InfoComponent},
  { path: 'rates', component: RatesComponent},
	{ path: '**', redirectTo: '/login', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ErrorComponent,
    InfoComponent,
    RatesComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [AuthService, CurrService],
  bootstrap: [AppComponent]
})
export class AppModule { }

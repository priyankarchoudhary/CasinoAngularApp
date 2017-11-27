import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes,RouterModule} from "@angular/router";
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { AppComponent } from './app.component';
import {LoginPageComponent} from "./login-page/login-page.component";
import {GamePageComponent} from "./game-page/game-page.component";
import {LoginServiceService} from "./LoginService/login-service.service";
import {HttpModule} from "@angular/http";
import {cookieServiceFactory} from "angular2-cookie/core";
import { FormsModule } from '@angular/forms';
import {GameServiceService} from "./GameService/game-service.service";

const approutes :Routes =  [
  {path:'', component:LoginPageComponent},
  {path:'gamepage', component:GamePageComponent},
  {path:'login', component:LoginPageComponent},
  {path:'**', component:LoginPageComponent}

];
@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    GamePageComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(approutes)
  ],
  providers: [LoginServiceService,CookieService,GameServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

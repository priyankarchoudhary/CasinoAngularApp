import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginServiceService} from "../login-service.service";
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private request :LoginServiceService,private _cookieService:CookieService,private router :Router) { }
  errorMessage : any;
  ngOnInit() {

    //console.log("Set Test Cookie as Test");

  }

  getCookie(key: string){
    return this._cookieService.get(key);
  }

  LoginValidate(email) {
    localStorage.clear();
    this.request.GetLoginData(email)
      .subscribe( data => {
          if(data != null)
          {
              console.log('this is my data');
            if(data.EmailId==email)
            {
              this.request.showControls= true;
              localStorage.setItem("detail",JSON.stringify(data));
              this._cookieService.put('userDetails',JSON.stringify(data));
              this.router.navigate(['/gamepage']);
            }
            else
            {
              this.errorMessage = "OOPS! Can not login"
              let k = this.errorMessage;
            }

          }
          else{
            console.log("Fail");
            this.errorMessage = "OOPS! Can not login"
            let k = this.errorMessage;
          }
        }
      );
  }

}

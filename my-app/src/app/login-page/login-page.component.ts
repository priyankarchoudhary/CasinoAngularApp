import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {LoginServiceService} from "../LoginService/login-service.service";
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private request :LoginServiceService,private _cookieService:CookieService,private router :Router) { }
  errorMessage : string;
  flag = false;

  ngOnInit() {  }


  LoginValidate(email) {
    localStorage.clear();

    this.request.GetLoginData(email)
      .subscribe( data => {
          if(data != null)
          {

            if(data.EmailId==email)
            {
              this.request.showControls= true;
              localStorage.setItem("detail",JSON.stringify(data));
              this._cookieService.put('userDetails',JSON.stringify(data));
              this.router.navigate(['/gamepage']);
            }
            else
            {
              this.flag=true;
              this.errorMessage = "OOPS! Can not login"


            }

          }
          else{
            console.log("Fail");
            this.flag=true;
            this.errorMessage = "OOPS! Can not login; something went wrong on server side";

          }
        }
      );
  }

}

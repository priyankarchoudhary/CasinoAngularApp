import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map'  ;
import {HttpClient} from "@angular/common/http";
const BASE_URL = 'http://localhost:52922/api/UserApi/GetUserByEmailID?email=';
const header = {headers: new Headers({'Content-Type': 'application/json'})}

@Injectable()
export class LoginServiceService {

  constructor(private http: Http) { }
  public showControls: boolean = false;
  GetLoginData(email)
  {
    return this.http.get(BASE_URL+email).map((res) => {
      return res.json();
    });
  }
}

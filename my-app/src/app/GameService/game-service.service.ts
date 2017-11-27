import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map'  ;
import {HttpClient} from "@angular/common/http";
const header = {headers: new Headers({'Content-Type': 'application/json'})}
const BlockMoneyURL = "http://localhost:52922/api/UserApi/BlockMoneyOnBet";
const AddMoneyURL = "http://localhost:52922/api/UserApi/WinningMoneyOnBet";


@Injectable()
export class GameServiceService {

  constructor(private http: Http) { }


  BlockMoneyService(data)
  {
    return this.http.patch(BlockMoneyURL+'?email='+data.email+'&rupees='+data.amount,data,header)
      .map(res => res.json());

  }

  AddMoneyService(data)
  {


    return this.http.patch(AddMoneyURL+'?email='+data.email+'&deposited='+data.betamount+'&multipliedBy='+data.mul,data,header)
      .map(res => res.json());


  }

}

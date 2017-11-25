import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from "../login-service.service";
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {Router} from "@angular/router";
import {GameServiceService} from "../game-service.service";

@Component({
  selector: 'app-game-page',
  templateUrl: './game-page.component.html',
  styleUrls: ['./game-page.component.css']
})
export class GamePageComponent implements OnInit {

  constructor(private request :LoginServiceService,
              private blockRequest:GameServiceService
              ,private addRequest:GameServiceService
              ,private router :Router) {}



  private bettingAmount = 0;
  private loc = 0;
  private catA = 1.5; private catB=1.25;private catC=10;
  private temp: boolean =this.request.showControls;
  private model = JSON.parse(localStorage.getItem("detail"));
  // private User = this.model.CustomerName;
  // private Amount =this.model.AccountBalance;
  private Email = this.model.EmailId;
  private randomNumber = 12//Math.floor(Math.random() * 36) + 1;




  mainModel : any;
  ngOnInit() {
    this.mainModel = {};
    this.mainModel.FirstTwelve = 0;
    this.mainModel.TwelevetoTwentyFour = 0;
    this.mainModel.ThreetoTwentyFour = 0;
    this.mainModel.Zero = 0;
    this.mainModel.OneToEighteen = 0;
    this.mainModel.NinteentoThirtySix = 0;
    this.mainModel.Even = 0;
    this.mainModel.Odd = 0;
  }


  Play(){
        //this.ngOnInit()
        let counter = 0;
           /*---------------------------------------------------*/
        for(var i in this.mainModel){if(this.mainModel[i]>0) {counter = counter + 1;}}
        if(counter==0 || counter > 1){alert("You can select exactly one choice");}

         if(counter==1) {
             for (var i in this.mainModel) {
        if(this.mainModel[i]>0)
        {
          this.bettingAmount=this.mainModel[i];
          break;
        }
        else {
          this.loc =this.loc +1;
        }
      }

            this.loc+=1; // id of the value on which you bet

           alert(this.Email+" "+this.bettingAmount+" "+this.loc+"chekc")
           this.BlockMoneyFunction(this.Email, this.bettingAmount, this.loc);

    }
  counter = 0; // make global variable zero
  }//End of Play Function

  GameRules() // it is called inside BlockMoneyFunction()
  {
    let choice = 0;

    if(this.loc>=1 && this.loc<=3){choice = 1;}
    if(this.loc ==4){choice ==2;}
    if(this.loc >=5 && this.loc <=8){choice = 3;}
    alert("Your choice is"+choice);
    switch (choice)
    {
      case 1:
        if((this.randomNumber >= 1 && this.randomNumber <= 12)
          ||( this.randomNumber >= 13 && this.randomNumber <= 24)
          ||(this.randomNumber >= 25 && this.randomNumber <= 36))
        {
              alert("In case 1");
              this.GetReward(this.catA)
        }
        break;

      case 2:
        if(this.randomNumber == 0)
        {
          alert("In case 2");
          this.GetReward(this.catC)
        }
        break;
      case 3:
        if((this.randomNumber >= 1 && this.randomNumber <= 18)
          ||(this.randomNumber >= 19 && this.randomNumber <= 36)
          ||(this.randomNumber % 2 == 0)||(this.randomNumber % 2 != 0) )

           {
             alert("In case 3");
             this.GetReward(this.catB)
           }

        break;

      default:
        alert("you lost")
        this.GetReward(0.0);
        break

    }
    this.ngOnInit()


  }

  GetReward(muliplicationFactor)
  {
      alert(this.Email+" "+this.bettingAmount+" "+muliplicationFactor);
      (<HTMLInputElement>(document.getElementById("wonbtn"))).click();
      this.AddMoneyFunction(this.Email, this.bettingAmount, muliplicationFactor)

  }

  AddMoneyFunction(email,bettingAmount,mult)
  {
    let user ={
      email : email,
      betamount : bettingAmount,
      mul:mult
    }
    alert(email+" "+bettingAmount+" "+mult+" add or remove money");
    this.addRequest.AddMoneyService(user)
      .subscribe( data => {
        if(data != null)
        {
          console.log("Amount updated Successfully")
        }
        else
        {
          console.log("Failed to update Amount");
        }
      });
  }

  BlockMoneyFunction(email,bettingAmount,temp)
  {
    let user ={
      email : email,
      amount : bettingAmount
    }
    alert(email+' '+bettingAmount+" "+temp)
    this.blockRequest.BlockMoneyService(user)
      .subscribe( data => {
        if(data != null)
        {
          console.log("Amount Blocked Successfully")
          this.GameRules();
        }

      });
  }

  Logout($event)
  {
    event.preventDefault();
    localStorage.removeItem('detail');
    localStorage.clear();
    this.request.showControls= false;
    this.router.navigate(['/login']);
  }

}


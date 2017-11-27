import { Component, OnInit } from '@angular/core';
import {LoginServiceService} from "../LoginService/login-service.service";
import {Router} from "@angular/router";
import {GameServiceService} from "../GameService/game-service.service";


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



  private bettingAmount = 0;   private winningAmount = 0;   private message = "Lose";   private message_top = "Sorry" ;private mult = 0.0;
  private loc = 0;   private catA = 1.5;   private catB=1.25;   private catC=10;   private temp: boolean =this.request.showControls;
  private model = JSON.parse(localStorage.getItem("detail"));
  private User = this.model.CustomerName;
  private Amount =this.model.AccountBalance;
  private Email = this.model.EmailId;

  private randomNumber = Math.floor(Math.random() * 36) + 0;


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
    this.Pull()

  }


  Play(){
        //this.ngOnInit()
        let counter = 0;
        this.loc = 0;

        for(var i in this.mainModel){if(this.mainModel[i]>0) {counter = counter + 1;}}
        if(counter==0 || counter > 1){(<HTMLInputElement>(document.getElementById("GameRule"))).click();}

         if(counter==1)
         {
             for (var i in this.mainModel)
             {
                if(this.mainModel[i]>0)
                {
                   this.bettingAmount=this.mainModel[i];
                    break;
                }
                 else
                {
                  this.loc =this.loc +1;
                }
             }
             this.loc+=1; // id of the value on which you bet//alert(this.Email+" "+this.bettingAmount+" "+this.loc+"chekc")
           if(this.bettingAmount > this.Amount || this.bettingAmount%500 != 0)
           {
             (<HTMLInputElement>(document.getElementById("balancecondition"))).click();
           }
           else
           {
             this.BlockMoneyFunction(this.Email, this.bettingAmount, this.loc);
           }

         }
        counter = 0;
  }

  GameRules() // it is called inside BlockMoneyFunction()
  {
    let choice = 0;
    choice = this.loc;
    //alert("Your choice is"+choice);
    switch (choice)
    {
      case 1:
          if((this.randomNumber >= 1 && this.randomNumber <= 12) )
          {
            this.mult = this.catA;
            this.message = "Win";
           this. message_top = "Congratulations";
          }
          break;
      case 2:
        if(this.randomNumber >= 13 && this.randomNumber <= 24)
        {
          this.message = "Win";
          this. message_top = "Congratulations";
          this.mult = this.catA;
        }
        break;
      case 3:
        if(this.randomNumber >= 25 && this.randomNumber <= 36)
        {
          this.message = "Win";
          this. message_top = "Congratulations";
          this.mult = this.catA;

        }
        break;

      case 4:
        if(this.randomNumber == 0)
        {
          this.message = "Win";
          this. message_top = "Congratulations";
          this.mult = this.catC;
        }
        break;
      case 5:
        if((this.randomNumber >= 1 && this.randomNumber <= 18))
        {
          this.message = "Win";
          this. message_top = "Congratulations";
          this.mult = this.catB;

        }
        break;
      case 6:
        if(this.randomNumber >= 19 && this.randomNumber <= 36)
        {
          this.message = "Win"
          this. message_top = "Congratulations";
          this.mult = this.catB;
        }
      break;
      case 7:
        if(this.randomNumber % 2 == 0)
        {
          this.message = "Win";
          this. message_top = "Congratulations";
          this.mult = this.catB;
        }
      break;
      case 8:
      if(this.randomNumber % 2 != 0)
      {
        this.message = "Win";
        this.mult = this.catB;
      }
      break;
      default:
        this.message = "Lose";
        this. message_top = "Sorry";
        this.mult = this.catA;
        break

    }
    choice = 0;
    this.GetReward(this.mult);
    this.ngOnInit()
  }

  GetReward(muliplicationFactor)
  {

      this.winningAmount = this.bettingAmount * muliplicationFactor;
      (<HTMLInputElement>(document.getElementById("wonbtn"))).click();
      this.AddMoneyFunction(this.Email, this.bettingAmount, muliplicationFactor);
  }

  AddMoneyFunction(email,bettingAmount,mult)
  {
    let user ={
      email : email,
      betamount : bettingAmount,
      mul:mult
    }

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

    this.request.GetLoginData(email)
      .subscribe( data => {
        if(data != null)
        {

          if(data.EmailId==email)
          {
            this.request.showControls= true;
            localStorage.setItem("detail",JSON.stringify(data));
            this.router.navigate(['/gamepage']);
          }}
      });

  this.model = JSON.parse(localStorage.getItem("detail"));
  this.User = this.model.CustomerName;
  this.Amount =this.model.AccountBalance;

    this.ngOnInit()
  }

  BlockMoneyFunction(email,bettingAmount,temp)
  {
    let user ={
      email : email,
      amount : bettingAmount
    }

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

  Pull()
  {
    this.request.GetLoginData(this.Email)
      .subscribe( data => {

          if(data != null)
          {
            if(data.EmailId==this.Email)
            {
              this.request.showControls= true;

              localStorage.setItem("detail",JSON.stringify(data));

              this.model = JSON.parse(localStorage.getItem("detail"));
              this.User = this.model.CustomerName;
              this.Amount =this.model.AccountBalance;
            }
          }
          else{
            console.log("Fail");
          }
        }
      );
  }

  HomePage()
  {
    location.href = "/gamepage";
  }

}



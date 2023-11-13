import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SlotComponent } from '../slot/slot.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-weekly-schedule',
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.css']
})
export class WeeklyScheduleComponent implements OnInit {

  constructor(private router:Router, private userService:UserService, private matDialog:MatDialog) { }

  ngOnInit(): void {

    this.date = new Date();

    this.prepareDates();

    for(var i=0;i<7;i++){
      console.log(this.dates[i]);
    }

    this.getDailySchedules();

  }

  amarnath = 'rgb(247, 237, 96)';

  s = false;

  dates:string[]=[];

  index=0;

  click(){
    this.s = true;
  }

  prepareDates(){

    var p = new Date();

    for(var i=0;i<7;i++){
      var t = new Date();

      if(t !== null && t !== undefined){
        t.setDate(p.getDate()+i);
        this.dates.push(t.toDateString());
      }


    }

  }

  prepareDatesforPrev(){

    // this.p+=7;

    var x = this.date;

    for(var i=7;i>0;i--){
      var t = new Date();

      if(t !== null && t !== undefined && x !== null && x !== undefined && this.date !== null && this.date !== undefined){
        t.setDate(x.getDate()-i);
        this.dates[7-i]=t.toDateString();

        console.log("date" + this.date);

        // if(i===7){
        //   this.date.setDate(x.getDate()-i);
        // }

      }


    }


  }

  bootstrapkudi(){
    this.prepareDatesfornext();
    this.getDailySchedules();
  }

  prepareDatesfornext(){

    var x = this.date;

    for(var i=0;i<7;i++){
      var t = new Date();
      t.setDate(t.getDate()+7);

      if(t !== null && t !== undefined && x !== null && x !== undefined && this.date !== null && this.date !== undefined){
        t.setDate(x.getDate()+i);
        this.dates[i]=t.toDateString();

        console.log("date" + this.date);

        // if(i===7){
        //   this.date.setDate(x.getDate()-i);
        // }

      }


    }


  }

  lick(e:any,i:any,j:any){
    var eu = e.target;
    console.log(eu);
    if(this.s===true && eu !== null){

      console.log(this.dailySchedules);

      const dialog = this.matDialog.open(SlotComponent,{
        data: { date: this.dates[i],slot: j+8},
      });

      dialog.afterClosed().subscribe(result => {
        window.location.reload();
      });

    }

  }

  bootstrapEdamaa(){
    this.prepareDatesforPrev();
    this.getDailySchedules();
  }

  getDailySchedules(){

      this.userService.getDailySchedules(this.userService.getUser().email,this.dates).subscribe(
        (data:any)=>{
          this.dailySchedules = data;


          for(var dailySchedule of this.dailySchedules){
            const slots = [];
            for(var i=0;i<10;i++){
              slots.push(null);
            }
            for(var slot of dailySchedule.slots){
              slots[slot.slot] = slot;
            }
            dailySchedule.slots = slots;
          }
          console.log(data);
        },
        (error:any)=>{
          console.log("error");
        }
      );

  }

  dailySchedules:any;

  n=0;
  p=0;

  date:Date | null | undefined;

}

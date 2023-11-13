import { Component, OnInit, SimpleChanges } from '@angular/core';
import { UserService } from '../service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members:any = [];

  map = new Map();

  md:any;

  tt:any = [];

  constructor(private userservice:UserService, private snack:MatSnackBar) {

   }

  ngOnInit(): void {
    this.getMembers();

    for(var i=0;i<10;i++){
      this.tt.push(null);
    }

  }

  Bool = true;

  Book = true;

  date = new FormControl();

  cb = new FormControl();

  okmembers:any = [];

  amarnath = 'rgb(247, 237, 96)';

  weeklychedule(id: any) {
    throw new Error('Method not implemented.');
  }

  ok(member:any){

    this.map.set(member.id,!this.map.get(member.id));
    
  }

  submit(){
    this.okmembers=[];
    this.tt=[];
    for(var i=0;i<10;i++){
      this.tt.push(null);
    }
    for(var member of this.members){
      if(this.map.get(member.id)===true){
        this.okmembers.push(member);
      }
    }
    this.Bool=true;
    console.log(this.okmembers);

    this.userservice.getMemberDailySchedules(this.okmembers,this.date.value.toDateString()).subscribe(

      (data:any)=>{
        console.log(data);

        this.md = data;

        if(this.md){
          for(var key in this.md){
            this.md[key].date = this.date.value.toDateString();
            const slots = [];
            for(var i=0;i<10;i++){
              slots.push(null);
            }
            for(var slot of this.md[key].slots){
              slots[slot.slot] = slot;
              this.tt[slot.slot] = "busy";
            }
            this.md[key].slots = slots;
          }
        }

        this.Book=false;

        console.log(this.md);
        console.log(this.tt);

      },
      (error)=>{

      }

    );

  }

  show(){
    this.Bool = false;
  }

  getMembers(){

    this.userservice.getMembers().subscribe(
      (data:any)=>{

        this.members = data;

        for(var member of this.members){
          this.map.set(member.id,false);
        }

      },
      (error:any)=>{

        this.snack.open('error members failed', '', {
          duration: 1000
        });

      }
    )

  }

}

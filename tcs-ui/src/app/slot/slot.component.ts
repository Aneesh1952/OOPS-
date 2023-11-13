import { UserService } from '../service/user.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {

  constructor(private userService:UserService, private snack: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: {date: String,slot: Number}, public dialogRef: MatDialogRef<SlotComponent>) { }

  ngOnInit(): void {
  }

  note = new FormControl("");
  status = new FormControl("");

  save(){

    const user = this.userService.getUser();
    console.log(this.note.value);

    this.userService.makeSlot(this.note.value,this.data.date,this.data.slot,this.status.value,user).subscribe(
      (data:any)=>{
        this.snack.open('saved', '', {
          duration: 1000
        });
      },
      (error:any)=>{
        this.snack.open('not saved', '', {
          duration: 1000
        });
      }
    );

    this.dialogRef.close();

  }

  dialogClose(){
    this.dialogRef.close();
  }

}

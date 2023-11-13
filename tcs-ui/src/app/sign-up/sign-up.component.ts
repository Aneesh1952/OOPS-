import { Component, OnInit, Optional } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { publicDecrypt } from 'crypto';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private userService:UserService, private snack: MatSnackBar, @Optional() public dialogRef: MatDialogRef<SignUpComponent>) {}

  ngOnInit(): void {
  }

  member = {
    name: '',
    email: '',
    password: '',
    memberType: ''
  }

  hide = true;

  memberTypes = ["STUDENT","INSTRUCTOR"];

  name = new FormControl("",[Validators.required]);
  email = new FormControl("",[Validators.required]);
  password = new FormControl("",[Validators.required,Validators.minLength(6)]);
  memberType = new FormControl("",[Validators.required]);

  loginForm = new FormGroup({
    name:this.name,
    email:this.email,
    password:this.password,
    memberType:this.memberType
  });

  submit(){

    
    if(this.name.value.trim()=='' || this.name.value==null){
      this.snack.open('name is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    if(this.email.value.trim()=='' || this.email.value==null){
      this.snack.open('Email is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    if(!this.email.value.endsWith('bits-pilani.ac.in')){
      this.snack.open('Only Bitsians are allowed !! ', '', {
        duration: 3000,
      });
      return;
    }

    if(this.password.value.trim()=='' || this.password.value==null){
      this.snack.open('name is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    this.member.name = this.name.value;
    this.member.email = this.email.value;
    this.member.password = this.password.value;
    this.member.memberType = this.memberType.value;

    this.userService.registerMember(this.member).subscribe(
      (data)=>{
        this.snack.open('signup successful', '', {
          duration: 1000
        });

        this.dialogRef.close();
      },
      (error)=>{
        this.snack.open('signup unsuccessful', '', {
          duration: 1000
        });

        this.dialogRef.close();
      }
    );

  }

  closeForm(){

    this.dialogRef.close();

  }

}

import { Component, OnInit, Optional } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private userService: UserService, private snack: MatSnackBar, private router:Router, @Optional() public dialogRef: MatDialogRef<LoginComponent> ) { }

  ngOnInit(): void {
  }

  hide = true;

  loginDetails = {

    email: '',
    password: ''

  }

  email = new FormControl("",[Validators.required]);
  password = new FormControl("",[Validators.required,Validators.minLength(6)]);

  loginForm = new FormGroup({
    username:this.email,
    password:this.password
  });



  submit() {

    if (this.email.value.trim() == '' || this.email.value == null) {
      this.snack.open('Username is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    if (this.password.value.trim() == '' || this.password.value == null) {
      this.snack.open('Password is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    this.loginDetails.email = this.email.value;
    this.loginDetails.password = this.password.value;

    this.userService.reset(this.loginDetails).subscribe(
      (data:any)=>{

        this.snack.open('Reset successful', '', {
          duration: 1000
        });

        this.dialogRef.close();

      },
      (error:any)=>{
        this.snack.open('Reset unsuccessful', '', {
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

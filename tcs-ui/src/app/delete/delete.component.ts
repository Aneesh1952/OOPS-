import { Component, OnInit, Optional } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  constructor(private userService: UserService, private snack: MatSnackBar, private router:Router, @Optional() public dialogRef: MatDialogRef<LoginComponent> ) { }

  ngOnInit(): void {
  }

  hide = true;

  loginDetails = {

    email: '',
    password: ''

  }

  password = new FormControl("",[Validators.required]);

  loginForm = new FormGroup({
    password:this.password
  });



  submit() {

    // if (this.username.value.trim() == '' || this.username.value == null) {
    //   this.snack.open('Username is required !! ', '', {
    //     duration: 3000,
    //   });
    //   return;
    // }

    if (this.password.value.trim() == '' || this.password.value == null) {
      this.snack.open('Password is required !! ', '', {
        duration: 3000,
      });
      return;
    }

    this.loginDetails.email = this.userService.getUser().email;
    this.loginDetails.password = this.password.value;

    this.userService.shut(this.loginDetails).subscribe(
      (data:any)=>{

        this.snack.open('delete successful', '', {
          duration: 1000
        });

        this.dialogRef.close();

      },
      (error:any)=>{
        this.snack.open('delete unsuccessful', '', {
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

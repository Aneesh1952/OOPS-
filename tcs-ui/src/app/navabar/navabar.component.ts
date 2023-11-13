import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'app-navabar',
  templateUrl: './navabar.component.html',
  styleUrls: ['./navabar.component.css']
})
export class NavabarComponent implements OnInit {

  isLoggedIn!:boolean;

  constructor(private dialog:MatDialog, private service:UserService, private router:Router ) { }

  ngOnInit(): void {

    this.isLoggedIn = this.service.isLoggedIn();
    this.service.loginStatusSubject.asObservable().subscribe((data) => {
      this.isLoggedIn = this.service.isLoggedIn();
    });

  }

  ngOnChange(): void {

    this.isLoggedIn = this.service.isLoggedIn();

  }

  resetPassword(): void {
    const dialogRef = this.dialog.open(ResetPasswordComponent, {
      width: '300px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  delete(): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '300px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.service.remove();
      this.router.navigate(['']);
      console.log('The dialog was closed');
    });

  }

  openLoginForm(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '300px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  openSignUpForm(): void {
    const dialogRef = this.dialog.open(SignUpComponent, {
      width: '350px',
      height: '480px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public logout() {
    this.service.remove();
    this.router.navigate(['/']);
  }

}

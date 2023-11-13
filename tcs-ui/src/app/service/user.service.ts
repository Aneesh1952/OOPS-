import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseurl from './helper';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLoggedIn(): boolean {
    return localStorage.getItem('user')!==null;
  }

  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  
  public getDailySchedules(member:any,dates:any){

    var url = `${baseurl}/member/ds/` + member;

    return this.http.post(url,dates);

  }

  public makeSlot(note:any,date:any,slot:any,status:any,user:any){

    if(status==="true"){
      status = true;
    }else{
      status = false;
    }

    const obj = {
      date:date,
      note:note,
      status:status
    }

    var url = `${baseurl}/member/slot/` + user.id + '/' + (slot-8);

    console.log(obj);

    return this.http.post(url,obj);

  }

  public getMemberDailySchedules(members:any,date:any){

    var url = `${baseurl}/member/memberds/` + date;

    return this.http.post(url,members);

  }

  shut(userDetails: { email: string; password: string; }) {
    var url = `${baseurl}/member/delete`;

    return this.http.post(url,userDetails);
  }

  public reset(userDetails:any){
    var url = `${baseurl}/member/reset`;

    return this.http.post(url,userDetails);
  }

  public registerMember(member:any){

    var url = `${baseurl}/member/register`;

    return this.http.post(url,member);

  }

  public remove(){

    localStorage.removeItem('user');

  }

  getMembers() {
    var url = `${baseurl}/member/members`;

    return this.http.get(url);
  }

  public login(userDetails:any){

    var url = `${baseurl}/member/login`;

    return this.http.post(url,userDetails);

  }

  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //getUser
  public getUser() {
    let userStr = localStorage.getItem('user');
    if (userStr != null) {
      return JSON.parse(userStr);
    } else {

      return null;
    }
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  public saveToken(token: string) {
    window.sessionStorage.removeItem("token");
    window.sessionStorage.setItem("token", token);
  }
   
  public getToken(): string {
    return sessionStorage.getItem("token");
  }

  public saveId(id:number){
    window.sessionStorage.setItem('id',id.toString());
  }

  public getId(){
   return parseInt(window.sessionStorage.getItem('id'));
  }

  signOut() {
    window.sessionStorage.clear();
  }
 
}

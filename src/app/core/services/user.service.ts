import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostPagingResponse } from '../models/postPagingResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string=environment.baseUrl;
  constructor(private http:HttpClient) { }

  getAllBlogs(params:HttpParams):Observable<PostPagingResponse>{
    return this.http.get<PostPagingResponse>(this.url+`/posts`,{params});
  }

  login(loginReq:{email:string,password:string}):Observable<{token:string,email:string}>{
    return this.http.post<{token:string,email:string}>(this.url+`/auth/login`,loginReq);
  }

  signup(signupReq:{email:string,password:string,name:string}):Observable<string>{
    return this.http.post(this.url+`/auth/signup`,signupReq,{responseType:'text'});
  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  url=environment.baseUrl;
  
  constructor(private http:HttpClient) { }

  setLikeOrDislike(postId:number):Observable<any>{
    return this.http.post<any>(this.url+`/likes/${postId}`,{});
  }

}

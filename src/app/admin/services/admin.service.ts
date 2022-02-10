import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { savePostReq } from '../models/savePostReq';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url=environment.baseUrl;
  constructor(private http:HttpClient) { }

  savePost(post:savePostReq){
    return this.http.post(this.url+`/posts`,post);
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  url=environment.baseUrl;

  constructor(private http:HttpClient) { }

  addComment(comment:{body:string},postId:number):Observable<Comment>{
    return this.http.post<Comment>(this.url+`/posts/${postId}/comments`,comment);
  }

}

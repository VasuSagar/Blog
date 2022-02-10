import { Component, Input, OnInit } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { Comment } from '../../models/comment';
import { Post } from '../../models/post';
import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input()post:Post;
  comments:Comment[];
  newCommentBody:string;
  loaderShow=false;
  
  constructor(private commentService:CommentService) { }

  ngOnInit(): void {
    this.comments=this.post.comments;
  }

  onCommentEntered(){
    this.loaderShow=true;
    console.log(this.newCommentBody);
    this.commentService.addComment({body:this.newCommentBody},this.post.id).subscribe(res=>{
      console.log(res);
      this.newCommentBody="";
      this.comments.push(res);
      this.loaderShow=false;
    });

    //hide loader if err on http
    setTimeout(()=>{
      this.loaderShow=false;
    },4000);
  }

}

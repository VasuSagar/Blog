import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { timeout } from 'rxjs/operators';
import { Comment } from '../../models/comment';
import { Post } from '../../models/post';
import { CommentService } from '../../services/comment.service';
import { LikeService } from '../../services/like.service';
import { TokenService } from '../../services/token.service';

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
  showLikesNames=false;
  @ViewChild('commentInput', {static: false}) commentInput: ElementRef;

  constructor(private commentService:CommentService,private likeService:LikeService,private tokenService:TokenService) { }

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

  onCommentButtonClicked(){
    this.commentInput.nativeElement.focus();
  }

  showLikes(){
    this.showLikesNames=true;
  }

  hideLikes(){
    this.showLikesNames=false;
  }

  setLikeDisLike(){
    this.likeService.setLikeOrDislike(this.post.id).subscribe(data=>{
      console.log(data);
      if(data.id!=null){
        //liked post
        this.post.likes.push(data);

        this.post.isLikedByMe=true;
        this.post.likesCount++;
      }
      else{
        //disliked
        const index=this.post.likes.findIndex(like=>like.userId==this.tokenService.getId());
        this.post.likes.splice(index,1)
        
        this.post.isLikedByMe=false;
        this.post.likesCount--;
      }
    });
  }

}

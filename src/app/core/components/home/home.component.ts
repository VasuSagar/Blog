import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Post } from '../../models/post';
import { PostPagingResponse } from '../../models/postPagingResponse';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  postPagingResponse: PostPagingResponse;
  posts: Post[] = [];
  loaderShow = false;
  pageNo = 0;
  pageSize = 10;
  isLastResponse = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  onScrollDown() {
    this.getBlogs();
  }

  /** call api only if lastResponse is not received*/
  getBlogs() {
    if (!this.isLastResponse) {
      this.loaderShow = true;
      let params = new HttpParams();
      params = params.append('pageNo', this.pageNo.toString());
      params = params.append('pageSize', this.pageSize.toString());
      this.userService.getAllBlogs(params).subscribe((res: PostPagingResponse) => {
        this.postPagingResponse = res;

        //better approach will be to send sorted from API itself
        this.postPagingResponse.posts.forEach(post=>{
          post.comments.sort((a,b)=>a.id-b.id);
        });
        
        this.posts.push(...this.postPagingResponse.posts);
        console.log(this.posts);
        
        this.pageNo++;
        this.isLastResponse = res.last;
        this.loaderShow = false;
      });
    }
  }
}

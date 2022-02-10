import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CoreRoutingModule } from './core-routing.module';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { PostComponent } from './components/post/post.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommentComponent } from './components/comment/comment.component';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    SignupComponent,
    PagenotfoundComponent,
    PostComponent,
    CommentComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule
  ]
})
export class CoreModule { }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm:FormGroup;
  constructor(private fb:FormBuilder,private userService:UserService,private notifierService:NotifierService,private router:Router) { }

  ngOnInit(): void {
    this.signupForm=this.fb.group({
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    });
  }

  onSubmit(){
    this.userService.signup(this.signupForm.value).subscribe((res:any)=>{
      this.notifierService.notify('success',res);
      this.router.navigate(['login']);      
    });
  }

}

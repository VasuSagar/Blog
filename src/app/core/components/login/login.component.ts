import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { TokenService } from '../../services/token.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  constructor(private fb:FormBuilder,private userService:UserService,private tokenService:TokenService,private notifierService:NotifierService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    });
  }

  onSubmit(){
    this.userService.login(this.loginForm.value).subscribe(data=>{
      this.tokenService.saveToken(data.token);
      this.notifierService.notify('success',"Logged In successfully");
      this.router.navigate(['']);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  postForm:FormGroup;
  constructor(private adminService:AdminService,private fb:FormBuilder,private notifierService:NotifierService) { }

  ngOnInit(): void {
    this.postForm=this.fb.group({
      title:['',[Validators.required,Validators.min(2)]],
      content:['',Validators.required],
      description:['',[Validators.required,Validators.minLength(5)]]
    });
  }

  onSubmit(){
    this.adminService.savePost(this.postForm.value).subscribe(res=>{
      console.log(res);
      this.notifierService.notify('success',"Post created");
    });
  }

}

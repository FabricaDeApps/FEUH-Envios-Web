import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LocalStoreService } from '../services/local-store.service';
import { md5 } from '../services/md5';
import { FEUHServices } from '../services/ws/FEUHServices';


declare var $: any

@Component({
  selector: 'app-login-admin',
  templateUrl: './loginAdmin.component.html',
  styleUrls: ['./loginAdmin.component.scss']
})
export class LoginAdminComponent implements OnInit {

  
  userForm: FormGroup;
  submitted = false;
  isLoading: boolean = false

  constructor(
    public fb: FormBuilder,
    private cookieService: CookieService, 
    private feuhServices:FEUHServices,
    private localStorage:LocalStoreService,
    private router: Router) {}

  ngOnInit(): void {
    $("#layout").removeClass("page-wrapper");
    $("#layout").addClass("page-start");
    this.cookieService.deleteAll();  
    
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    var param = {
      email: this.userForm.value.email,
      password: this.userForm.value.password,
    };
    let body = JSON.stringify(param);
    console.log("RQ: " + body)
    this.feuhServices.LoginAdmin(body).subscribe(
      (response:any) => {
        console.log(response)
        if(response.header.code == 200){
          this.cookieService.set('isLogin', "true");
          this.localStorage.setItem("type", 2)
          this.localStorage.setItem("hash_admin", response.data.hash_admin)
          this.localStorage.setItem("name", response.data.name)
          this.localStorage.setItem("last_name", response.data.last_name)
          this.localStorage.setItem("role", response.data.role)
          this.localStorage.setItem("email", response.data.email)
          this.router.navigate(['/admin/home'])
          this.addOrRemoveClass()
        }
      },
      (error) => {
    });
  }


  addOrRemoveClass() {
    $("#layout").removeClass("page-start");
    $("#layout").addClass("page-wrapper");
  }

  
}

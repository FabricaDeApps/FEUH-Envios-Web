import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LocalStoreService } from '../services/local-store.service';
import { md5 } from '../services/md5';
import { FEUHServices } from '../services/ws/FEUHServices';


declare var $: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  
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

  loadSpinner(): void {
    this.isLoading = true;
  }

  login() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    this.loadSpinner()
    var param = {
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      //token: "1234"
    };
    let body = JSON.stringify(param);
    console.log("RQ: " + body)
    this.feuhServices.LoginClient(body).subscribe(
      (response:any) => {
        console.log(response)
        if(response.header.code == 200){
          this.cookieService.set('isLogin', "true");
          this.localStorage.setItem("type", 1)
          this.localStorage.setItem("hashUser", response.data.hashUser)
          this.localStorage.setItem("fullName", response.data.fullName)
          this.localStorage.setItem("email", response.data.email)
          this.router.navigate(['/envios'])
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

  registrarse(){
    this.router.navigate(['/registro'])
  }

  menuItems: any[] = [
    {
      label: ' contacto@feuh.com.mx',
      icon: 'fa fa-envelope',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: ' +52 55 7586 8462',
      icon: 'fa fa-phone',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: ' WhatsApp',
      icon: 'fa-whatsapp',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },
    {
      label: ' Facebook',    
      icon: 'fab fa-facebook',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: true
    },


    
  ];
  
}

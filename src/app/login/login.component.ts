import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  signinForm: FormGroup;

  constructor(private cookieService: CookieService, 
    private feuhServices:FEUHServices,
    private localStorage:LocalStoreService,
    private router: Router) {}

  ngOnInit(): void {
    $("#layout").removeClass("page-wrapper");
    $("#layout").addClass("page-start");
    this.cookieService.deleteAll();  
    
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }


  login() {
    const signinData = this.signinForm.value
    console.log('sign');
    let passwordEncrypted = md5(signinData.password);
    var params = {
      email: signinData.username,
      password: passwordEncrypted
    }
    let body = JSON.stringify(params)
    console.log("RQ: " + body)
    this.feuhServices.LoginClient(body).subscribe(
      (data:any) => {
        console.log(data)
        if(data.code == 200){
          this.cookieService.set('isLogin', "true");
          this.router.navigate(['/envios'])
          this.addOrRemoveClass()
          this.localStorage.setItem("type", 1)
          this.localStorage.setItem("hashClient", data.data.hashClient)
          this.router.navigateByUrl('dashboard/util')
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

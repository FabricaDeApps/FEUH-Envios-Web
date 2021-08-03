import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
declare var $: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private cookieService: CookieService, private router: Router) {}

  ngOnInit(): void {
    $("#layout").removeClass("page-wrapper");
    $("#layout").addClass("page-start");
    this.cookieService.deleteAll();    
  }

  login(){
    this.cookieService.set('isLogin', "true");
    this.router.navigate(['/envios'])
    this.addOrRemoveClass()
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

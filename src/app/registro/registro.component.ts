import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  label="";
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

  onSelectItem(value){
    if(value=="1"){
      this.label="Nombre de la persona";
    }else{
      this.label="Razón social";
    }
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

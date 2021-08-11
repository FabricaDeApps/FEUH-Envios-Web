import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FEUHServices } from '../services/ws/FEUHServices';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  
  label="";
  registerForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private feuhServices:FEUHServices,
    private cookieService: CookieService, 
    private router: Router) {}

  ngOnInit(): void {
    $("#layout").removeClass("page-wrapper");
    $("#layout").addClass("page-start");
    this.cookieService.deleteAll();    

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required]],
      contactName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      password: ['', [Validators.required]],
      rePassword: ['', [Validators.required]],
      typeUser: ['', [Validators.required]]
    });
  }

  register(){

    if (this.registerForm.value.password != this.registerForm.value.rePassword) {
      return;
    }
    
    var param = {
      fullName: this.registerForm.value.fullName,
      typeUser: this.registerForm.value.typeUser,
      phone: this.registerForm.value.phone,
      contactName: this.registerForm.value.contactName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      loginType: 'form',
    };
    let body = JSON.stringify(param);
    console.log("RQ: " + body)
    this.feuhServices.RegisterUser(body).subscribe(
      (response:any) => {
        console.log(response)
        if(response.code == 200){
          alert(response.message)
          this.router.navigate(['/login'])
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

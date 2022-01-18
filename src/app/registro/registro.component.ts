import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DialogComponent } from '../material-component/dialog/dialog.component';
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
      name: this.registerForm.value.fullName,
      regimen: this.registerForm.value.typeUser,
      phone_number: this.registerForm.value.phone,
      contact_name: this.registerForm.value.contactName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      reason_social: this.registerForm.value.fullName,
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
    if(value=="Fisica"){
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

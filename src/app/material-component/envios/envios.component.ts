import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any
@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.scss']
})
export class EnviosComponent implements OnInit, AfterViewInit {
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  typePack: any = ""
  typeVehiculo: any = ""
  paymentMethod: any = ""
  
  isLoading: boolean = false;
  typeService: Tipo[] = [
    {value: 'Motocicleta', viewValue: 'Motocicleta'},
    {value: 'Bicicleta', viewValue: 'Bicicleta'},
    {value: 'Automóvil', viewValue: 'Automóvil'}
  ];
  favoriteObj: string;
  formCotizar: FormGroup
  objetos: string[] = ['Sí (Describir en observaciones)', 'No'];

  constructor(
    private spinner: NgxSpinnerService,
    private fb: FormBuilder) {
    this.formCotizar = this.fb.group({
      typeService: [''],
      nameRemitente: [''],
      apellidosRemitente: [''],
      dateRecolect: [''],
      hourRecolect: [''],
      addressRecolect: [''],
      address2Recolect: [''],
      ciudadRecolect: [''],
      stateRecolect: [''],
      postalCodeRecolect: [''],
      objects: [''],
      comments: [''],

      //form2 entrega
      nameDest: [''],
      apellidosDest: [''],
      fechaEntrega: [''],
      horaEntrega: [''],
      addressDest: [''],
      address2Dest: [''],
      ciudadDest: [''],
      stateDest: [''],
      postalCodeDest: [''],
      nameReceive: [''],
      apellidosReceive: [''],
      identificacion: [''],
      observations: [''],
    })
  }


  ngOnInit(): void {
    this.firstFormGroup = this.fb.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.fb.group({
      secondCtrl: ['', Validators.required]
    });
  }
  latitude: number = 19.4978;
  longitude: number = -99.1269;
  zoom: number = 8;
  ngAfterViewInit() { }

  selectPack(select: any, stepper: MatStepper) {
    this.typePack = ""
    this.typePack = select
    if (select == "sobre") {
      $("#" + select).addClass("active-pack");
      $("#mediana").removeClass("active-pack")
      $("#grande").removeClass("active-pack")
    }

    if (select == "mediana") {
      $("#" + select).addClass("active-pack");
      $("#sobre").removeClass("active-pack")
      $("#grande").removeClass("active-pack")
    }

    if (select == "grande") {
      $("#" + select).addClass("active-pack");
      $("#mediana").removeClass("active-pack")
      $("#sobre").removeClass("active-pack")
    }
    stepper.next();
  }


  selectPayment(select: any, stepper: MatStepper){
    this.paymentMethod = ""
    this.paymentMethod = select
    if (select == "efectivo") {
      $("#" + select).addClass("active-pack");
      $("#tarjeta").removeClass("active-pack")
      $("#kilometros").removeClass("active-pack")
    }

    if (select == "tarjeta") {
      $("#" + select).addClass("active-pack");
      $("#kilometros").removeClass("active-pack")
      $("#efectivo").removeClass("active-pack")
    }

    if (select == "kilometros") {
      $("#" + select).addClass("active-pack");
      $("#efectivo").removeClass("active-pack")
      $("#tarjeta").removeClass("active-pack")
    }
    stepper.next();
  }

  selectVehiculo(select: any, stepper: MatStepper){
    this.typeVehiculo = ""
    this.typeVehiculo = select
    if (select == "bici") {
      $("#" + select).addClass("active-pack");
      $("#moto").removeClass("active-pack")
      $("#camioneta").removeClass("active-pack")
    }

    if (select == "moto") {
      $("#" + select).addClass("active-pack");
      $("#camioneta").removeClass("active-pack")
      $("#bici").removeClass("active-pack")
    }

    if (select == "camioneta") {
      $("#" + select).addClass("active-pack");
      $("#bici").removeClass("active-pack")
      $("#moto").removeClass("active-pack")
    }
    stepper.next();
  }

  async cotizarEnvio(){
    await this.spinner.show()
    if (!this.formCotizar.valid) {
      return;
    }
    console.warn(this.typePack)
    console.warn(this.formCotizar.value)
    this.terminateSpinner()
  }

  terminateSpinner(): void {
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

}

export interface Tipo {
  value: string;
  viewValue: string;
}
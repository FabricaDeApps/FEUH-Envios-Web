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
  infoAdicionalForm: FormGroup;
  vehiculoForm: FormGroup;
  sizeForm: FormGroup;
  paymentForm: FormGroup;
  formAddress: FormGroup
  typePack: any = ""
  typeVehiculo: any = ""
  paymentMethod: any = ""
  idAddressSelect: any = ""  
  isLoading: boolean = false;  
  addresses: Addresses[] = [
    {id: 1, street: "address1", numberInt: "1", property: "privada", observation: "ninguna", letter: "A"},
    {id: 2, street: "address2", numberInt: "3", property: "privada", observation: "ninguna", letter: "B"},
  ]

  constructor(
    private spinner: NgxSpinnerService, 
    private fb: FormBuilder) {
      this.formAddress = this.fb.group({
        street: ['', [Validators.maxLength(250)]],
        numberInt: ['', [Validators.maxLength(250)]],
        inmueble: ['', [Validators.maxLength(250)]],
        observaciones: ['', [Validators.maxLength(500)]],
      });

      this.formAddress.get('street').disable();
      this.formAddress.get('numberInt').disable();
      this.formAddress.get('inmueble').disable();
      this.formAddress.get('observaciones').disable();
      this.vehiculoForm = this.fb.group({
        vehiculo: ['', [Validators.required]],      
      });

      this.sizeForm = this.fb.group({
        sizePack: ['', [Validators.required]],      
      });

      this.paymentForm = this.fb.group({
        payment: ['', [Validators.required]],      
      });
  }


  ngOnInit(): void {
    this.infoAdicionalForm = this.fb.group({
      remitente: ['', [Validators.maxLength(250), Validators.required]],
      remitenteTel1: ['', [Validators.maxLength(10), Validators.required, Validators.pattern(new RegExp("[0-9 ]{10}"))]],
      remitenteTel2: ['', [Validators.maxLength(10), Validators.pattern(new RegExp("[0-9 ]{10}"))]],
      observacionesRemitente: ['', [Validators.maxLength(500)]],

      destinatario: ['', [Validators.maxLength(250), Validators.required]],
      destinatarioTel1: ['', [Validators.maxLength(10), Validators.required, Validators.pattern(new RegExp("[0-9 ]{10}"))]],
      destinatarioTel2: ['', [Validators.maxLength(10), Validators.pattern(new RegExp("[0-9 ]{10}"))]],
      observacionesDest: ['', [Validators.maxLength(500)]],

      valorContenido: ['', [Validators.maxLength(250)]],
      contiene: ['', [Validators.maxLength(250)]],

      fechaEntrega: ['', [Validators.required]],
      horaEntrega: ['', [Validators.required]],
    });
  }
  latitude: number = 19.4978;
  longitude: number = -99.1269;
  zoom: number = 8;
  ngAfterViewInit() { }

  get formInfo() {
    return this.infoAdicionalForm.controls;
  }

  get formAddresses() {
    return this.formAddress.controls;
  }

  selectAddress(address: Addresses,  stepper: MatStepper){
    this.idAddressSelect = address.id;
    stepper.next()
  }

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
    this.sizeForm.controls['sizePack'].setValue(2);
    stepper.next();
  }

  sendRequest(){
    var params = {
      vehicle: this.typeVehiculo,
      sizePack: this.typePack,
      idAddress: this.idAddressSelect,

      remitente: this.infoAdicionalForm.value.remitente,
      remitenteTel1: this.infoAdicionalForm.value.remitenteTel1,
      remitenteTel2: this.infoAdicionalForm.value.remitenteTel2,
      observacionesRemitente: this.infoAdicionalForm.value.observacionesRemitente,

      destinatario: this.infoAdicionalForm.value.destinatario,
      destinatarioTel1: this.infoAdicionalForm.value.destinatarioTel1,
      destinatarioTel2: this.infoAdicionalForm.value.destinatarioTel2,
      observacionesDest: this.infoAdicionalForm.value.observacionesDest,

      valorContenido: this.infoAdicionalForm.value.valorContenido,
      contiene: this.infoAdicionalForm.value.contiene,

      fechaEntrega: this.infoAdicionalForm.value.fechaEntrega,
      horaEntrega: this.infoAdicionalForm.value.horaEntrega,
    }
    let body = JSON.stringify(params)
    console.warn(body)
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
    this.paymentForm.controls['payment'].setValue(3);
    this.sendRequest()
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
    this.vehiculoForm.controls['vehiculo'].setValue(1);
    stepper.next();
  }

  checkPayment(){
    if(this.paymentMethod == "efectivo"){
      return "EFECTIVO"
    }
    if(this.paymentMethod == "tarjeta"){
      return "TARJETA"
    }

    if(this.paymentMethod == "kilometros"){
      return "KILOMETROS"
    }
  }
  terminateSpinner(): void {
    setTimeout(() => {
      this.spinner.hide();
    }, 500);
  }

}

export interface Addresses{
  id: any
  street: string
  numberInt: any,
  property: any,
  observation: string,
  letter: any
}
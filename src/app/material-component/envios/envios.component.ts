import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { FEUHServices } from '../../services/ws/FEUHServices';
declare var $: any
@Component({
  selector: 'app-envios',
  templateUrl: './envios.component.html',
  styleUrls: ['./envios.component.scss']
})
export class EnviosComponent implements OnInit, AfterViewInit {
  typePack: any = ""
  
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
    private feuhServices:FEUHServices,
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

  }
  latitude: number = 19.4978;
  longitude: number = -99.1269;
  zoom: number = 8;
  ngAfterViewInit() { }

  seeSelect(select: any) {
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
  }

  async cotizarEnvio(){
    await this.spinner.show()
    if (!this.formCotizar.valid) {
      return;
    }
    console.warn(this.typePack)
    console.warn(this.formCotizar.value)
    
    var param = {
      idUser: '',
      typeService: this.formCotizar.value.typeService,
      nameRemitente: this.formCotizar.value.nameRemitente,
      apellidosRemitente: this.formCotizar.value.apellidosRemitente,
      dateRecolect: this.formCotizar.value.dateRecolect,
      hourRecolect: this.formCotizar.value.hourRecolect,
      addressRecolect: this.formCotizar.value.addressRecolect,
      ciudadRecolect: this.formCotizar.value.ciudadRecolect,
      stateRecolect: this.formCotizar.value.stateRecolect,
      postalCodeRecolect: this.formCotizar.value.postalCodeRecolect,
      objects: this.formCotizar.value.objects,
      comments: this.formCotizar.value.comments,
      nameDest: this.formCotizar.value.nameDest,
      apellidosDest: this.formCotizar.value.apellidosDest,
      fechaEntrega: this.formCotizar.value.fechaEntrega,
      horaEntrega: this.formCotizar.value.horaEntrega,
      addressDest: this.formCotizar.value.addressDest,
      address2Dest: this.formCotizar.value.address2Dest,
      ciudadDest: this.formCotizar.value.ciudadDest,
      stateDest: this.formCotizar.value.stateDest,
      postalCodeDest: this.formCotizar.value.postalCodeDest,
      nameReceive: this.formCotizar.value.nameReceive,
      apellidosReceive: this.formCotizar.value.apellidosReceive,
      identificacion: this.formCotizar.value.identificacion,
      observations: this.formCotizar.value.observations
    };
    let body = JSON.stringify(param);
    console.log("RQ: " + body)

    this.feuhServices.RegisterOrder(body).subscribe(
      (response:any) => {
        console.log(response)
        if(response.code == 200){
          this.terminateSpinner();
          alert(response.message)
        }
      },
      (error) => {
        this.terminateSpinner();
      }
    );





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
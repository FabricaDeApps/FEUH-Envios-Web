import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
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
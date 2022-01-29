import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { FEUHServices } from '../../services/ws/FEUHServices';
declare var $: any
@Component({
  selector: 'app-admin-home',
  templateUrl: './adminHome.component.html',
  styleUrls: ['./adminHome.component.scss']
})




export class AdminHomeComponent implements OnInit, AfterViewInit {

  
  displayedColumns = ['contact_name', 'email', 'reason_social', 'regimen'];

  /*
  dataSource = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];;*/
  
  userList:any = [];

  constructor(
    private spinner: NgxSpinnerService, 
    private feuhServices:FEUHServices,
    private fb: FormBuilder) {
      
  }
  ngAfterViewInit(): void {
  }


  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.spinner.show()
    var param = {
      page: 1,
      limit: 100,
    };
    let body = JSON.stringify(param);
    console.log("RQ: " + body)
    this.feuhServices.GetUsers(body).subscribe(
      (response:any) => {
        this.spinner.hide()
        console.log(response)
        if(response.header.code == 200){
          this.userList = response.data.distributor;
          console.log(this.userList);
        }
      },
      (error) => {
    });
  }


}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-semanal',
  templateUrl: './semanal.component.html',
  styleUrls: ['./semanal.component.css']
})
export class SemanalComponent implements OnInit {
  
  // Objects
  countrySelect: Object;
  // By default select monday
  selected:any;
  countries = [
    {id: 1, name: "Lunes"},
    {id: 2, name: "Martes"},
    {id: 3, name: "Miercoles"},
    {id: 4, name: "Jueves"},
    {id: 5, name: "Viernes"},
    {id: 6, name: "Sabado"},
    {id: 7, name: "Domingo"}
  ];

  constructor() { }

  ngOnInit() {
    this.selected = false
  }


   // Grav selection from form
  updateSelectedCountry(event){
    this.selected = event
    console.log(this.selected)
  }

  updateDate(event){
    //console.log(event)
    this.selected = event.toDateString()
    console.log(this.selected)
  }
}

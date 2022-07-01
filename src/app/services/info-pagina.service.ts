import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;
  equipo: any = {};

  constructor( private http: HttpClient ) {
    this.cargarInfo();
    this.cargarEquipo();
    
   }

   private cargarInfo(){
    console.log('Servicio de infoPagina listo')

    //Leer archivo JSON
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina) =>{
        this.cargada = true;
        this.info = resp;
      })
   }

   private cargarEquipo(){
    console.log('Servicio de firebase listo')

    //Leer archivo JSON Firebase
    this.http.get('https://angular-html-57ecc-default-rtdb.firebaseio.com/equipo.json')
      .subscribe( (resp: any) =>{
        this.equipo = resp;
        console.log(resp)
      })

   }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos: Producto[] = [];
  cargando = true;
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  private cargarProductos(){

    return new Promise<void>( (resolve, reject) =>{
      this.http.get('https://angular-html-57ecc-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe( (resp: any) =>{
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });



  }

  getProducto (id: string){
    return this.http.get(`https://angular-html-57ecc-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto(termino:string){

    if(this.productos.length === 0){
      //Cargar productos
      this.cargarProductos().then( () => {
        //ejecutar después de tener los productos 
        //aplicar filtro
        this.filtrarProductos(termino);
      });
    }else{
      //aplicar filtro
      this.filtrarProductos(termino);
    }
    
  }


  private filtrarProductos(termino: string){
    this.productosFiltrado= [];
    
    termino = termino.toLocaleLowerCase();
    
    //por cada producto...
    this.productos.forEach(prod =>{
      const tituloLower = prod.titulo.toLocaleLowerCase();
      //comprobamos si la categoria coincide en algo o el titulo 
      if(prod.categoria.indexOf(termino)>=0 || tituloLower.indexOf(termino) >=0){
        //lo subimos al array de productos filtrados
        this.productosFiltrado.push(prod)
      }
    });

  }
}

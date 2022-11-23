import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor(private gifsServices: GifsService){}

  buscar() {
    const terminoBuscar = this.txtBuscar.nativeElement.value;

    if (terminoBuscar.trim().length === 0) {
      return ;
    }

     this.gifsServices.buscarGifs(terminoBuscar)

    this.txtBuscar.nativeElement.value = '';
  }

}

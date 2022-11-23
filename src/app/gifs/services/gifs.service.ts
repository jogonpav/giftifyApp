import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'UjASVfJl2OXNtgvEl4UyHO6pAQV6L3BQ';
  private _historial : string []=[];
  public resultados: Gif[]=[];

  get historial (){
    return [...this._historial];
  }

  constructor(private http: HttpClient){}

  buscarGifs( queryTerm: string){

    queryTerm = queryTerm.trim().toLocaleUpperCase();
    console.log(this._historial);

    if(!this._historial.includes(queryTerm)) {
      this._historial.unshift(queryTerm);
      this._historial = this._historial.splice(0,10);
    }

    this.http.get<SearchGifsResponse>(`http://api.giphy.com/v1/gifs/search?api_key=UjASVfJl2OXNtgvEl4UyHO6pAQV6L3BQ&q=${queryTerm}&limit=10`)
      .subscribe((resp) => {
        console.log(resp.data)
        this.resultados = resp.data;
      })
  }

}

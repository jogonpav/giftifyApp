import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'UjASVfJl2OXNtgvEl4UyHO6pAQV6L3BQ';
  private baseUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial : string []=[];
  public resultados: Gif[]=[];

  get historial (){
    return [...this._historial];
  }

  constructor(private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
    //this._historial[0] ? this.buscarGifs(this._historial[0]): "";
  }

  buscarGifs( queryTerm: string){

    queryTerm = queryTerm.trim().toLocaleUpperCase();
    console.log(this._historial);

    if(!this._historial.includes(queryTerm)) {
      this._historial.unshift(queryTerm);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial))
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', queryTerm);

    this.http.get<SearchGifsResponse>(`${this.baseUrl}/search`, {params: params})
      .subscribe((resp) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })
  }

}

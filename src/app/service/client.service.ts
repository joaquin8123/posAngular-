import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
	public url: string;

  constructor(	private _http: HttpClient	) {
  	this.url = Global.url;
    //http://localhost:3000
  }

  //Metodo de prueba para el servidor
  test(): Observable<any>{
  	let headers = new HttpHeaders().set('Content-Type', 'application/json');
  	return this._http.get(this.url+"/test", {headers: headers});
  }

  //Metodo para retornar un listado de clientes del servidor
  getClients(): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"/clientes", {headers: headers});
  }

  //Metodo para obtener un solo cliente del servidor
  getOne(id): Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url+"/cliente/"+id, {headers: headers});
  }

  //Metodo para agregar un nuevo cliente a la base de datos
  addClient(client): Observable<any>{
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.post(this.url+"/crear-cliente", client, {headers: headers});
  }

  //Metodo para actualizar un cliente
  updateClient(client): Observable<any>{
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.put(this.url+"/editar-cliente/"+client.id, client, {headers: headers});
  }

  //Metodo para obtener cliente mediante nombre o identificacion
  getBy(client){
    let headers = new HttpHeaders().set("Content-Type", "application/json");
    return this._http.post(this.url+"/get-by", client, {headers: headers});
  }
}

import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../service/client.service';
import { ClientModel } from '../../../models/cliente.model';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
	public title: string;
	public client: ClientModel;
	public success: number;
	public type: string;
  public newId: string;

  constructor(	private _clientService: ClientService	) {
  	this.title = "Registrar un cliente";
  	this.client = new ClientModel(null,"","","","","","",true,true,null,null,null,"");
  	this.success = 0;
	this.type = "new";
  }

  ngOnInit() {
  }

  //Metodo para capturar evento cuando se guarda el formulario para registrar un nuevo cliente
  onSubmit(){

    console.log('FAFA',this.client);
  	this._clientService.addClient(this.client).subscribe(
  		response => {
			console.log(response);
			this.newId = response.cliente.id;
			//console.log(this.newId);
  			this.success = 1;
  		},
  		error => {
  			console.log(<any>error);
  			this.success = -1;
  		}
  	);
  }
}

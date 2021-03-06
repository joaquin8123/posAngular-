import { Component, OnInit } from '@angular/core';

import { RegistryService } from '../../../service/registry.service';
import { ClientService } from '../../../service/client.service';
import { InventoryService } from '../../../service/inventory.service';

import { ClientModel } from '../../../models/cliente.model';
import { ProductModel } from '../../../models/producto.model';
import { ComprobanteModel } from'../../../models/comprobante.model';
import { LineaComprobante } from'../../../models/lineaComprobante';

@Component({
  selector: 'app-add-registry',
  templateUrl: './add-registry.component.html',
  styleUrls: ['./add-registry.component.css']
})
export class AddRegistryComponent implements OnInit {
	public clientToBuy: any;
	public products: ProductModel[];
	public products_to_select: ProductModel[];
	public success_client: number;
	public success_products: number;
	public comprobante: ComprobanteModel;
	public lineaComprobante: LineaComprobante;
	public clients: Array<any>[];
	public productos: Array<any>[];
	public productosSeleccionados: Array<ProductModel>[] = []
	public selectedClient: any;
	public selectedProduct: any;
		//Busqueda de cliente
	public searchClient: {
		key: string,
		value: string
	};

	//Busqueda de productos
	public searchProduct: {
		key: string,
		value: string,
		quantity: number
	};

  constructor(	private _registryService: RegistryService,
  				private _inventoryService: InventoryService,
  				private _clientService: ClientService) {
  	this.success_client = 0;
  	this.success_products = 0;
  	this.searchClient = {key: "", value: ""};
  	this.searchProduct = {key: "", value: "", quantity: null};
	this.getClients()
	this.getProducts()
	this.comprobante = new ComprobanteModel(null,{clienteId:null,nombre:"",numero_documento:"",email:"",domicilio:""},"",null,null,null,null,null,{productoId:null,nombre: "",categoria: "",descripcion: "",precio_unitario: null,cantidad: null});
  	this.lineaComprobante = new LineaComprobante(null,"" ,"" ,"",0,0);
  }

  ngOnInit() {
  }
  	//Metodo que busca los clientes
	getClients(){
	this._clientService.getClients().subscribe(
		response => {
			this.clients = response.clientes
		// 	this.clientToBuy = response;
		//   this.clientToBuy = this.clientToBuy.Client;
			if(this.clientToBuy.length == 0){
				alert("No se ha podido encotrado el cliente");
			}
			else{
				this.success_client = 1;
			}
		},
		error => {
			console.log(<any>error);
			alert("Ha ocurrido un error al intentar encotrar el cliente");
			//this.success_client = -1;
		}
	);
}
getProducts(){
	this._inventoryService.getProducts().subscribe(
		response => {
			this.productos = response.productos
		// 	this.clientToBuy = response;
		//   this.clientToBuy = this.clientToBuy.Client;
			if(this.productos.length == 0){
				alert("No se ha podido encotrado el cliente");
			}
			else{
				this.success_client = 1;
			}
		},
		error => {
			console.log(<any>error);
			alert("Ha ocurrido un error al intentar encotrar el cliente");
			//this.success_client = -1;
		}
	);
}
  //Metodo para buscar un cliente por nombre o identificacion
  getClient(){
  	this._clientService.getBy(this.searchClient).subscribe(
  		response => {
  			this.clientToBuy = response;
			this.clientToBuy = this.clientToBuy.Client;
  			if(this.clientToBuy.length == 0){
  				alert("No se ha podido encotrado el cliente");
  			}
  			else{
	  			this.success_client = 1;
	  		}
			return response
  		},
  		error => {
  			console.log(<any>error);
  			alert("Ha ocurrido un error al intentar encotrar el cliente");
  			//this.success_client = -1;
  		}
  	);
  }
  clientSelected($event){
	console.log('Event',this.selectedClient)
	let cliente = this._clientService.getOne(this.selectedClient.id).subscribe(
	response => {
		console.log('Response',response)
		this.comprobante.cliente.clienteId = response.cliente.id;
		this.comprobante.cliente.domicilio = response.cliente.domicilio;
		this.comprobante.fecha = new Date()
		if(this.clientToBuy.length == 0){
			alert("No se ha podido encotrado el cliente");
		}
		else{
			this.success_client = 1;
		}
		return response
	},
	error => {
		console.log(<any>error);
		alert("Ha ocurrido un error al intentar encotrar el cliente");
		//this.success_client = -1;
	}
	);
	console.log('Cliente',cliente)
  }
  productSelected($event){
	console.log('Event',this.selectedProduct)
	this._inventoryService.getProduct(this.selectedProduct.id).subscribe( response =>{
		this.comprobante.producto.productoId = response.producto.id
		this.comprobante.producto.precio_unitario = response.producto.precio_unitario
		this.comprobante.producto.cantidad = 1
	})
  }
  addProduct(producto){
	console.log('aaa',producto)
	this.productosSeleccionados.push(producto) 
	console.log('ASDASD',this.productosSeleccionados)
  }
 	//Metodo para capturar el cliente seleccionado de el componente hijo
  select(event){
  	this.clientToBuy = event;
  	//console.log(event);
  	console.log(this.clientToBuy);
  	//this.registry.client.id = this.clientToBuy._id;
  	//this.registry.client.name = this.clientToBuy.name;
  	//this.registry.client.surname = this.clientToBuy.surname;
  	//this.registry.client.identification = this.clientToBuy.identification;
  	this.success_client = 2;
  }

  //Metodo para cambiar el cliente seleccionado del componente hijo
  change(){
  	this.success_client = 0;
  }

  //Metodo para buscar un producto de la base de datos
//   getProduct(){
//   	console.log(this.searchProduct);
//   	if(this.searchProduct.key == 'id'){
//   		this._inventoryService.getProduct(this.searchProduct.value).subscribe(
//   			response => {
//   				if(this.products[0].name == ""){
//   					this.products[0] = response.Product;
//   					console.log(this.products);  
//   					this.products[0].quantity = this.searchProduct.quantity;
//   					this.registry.total_price = this.products[0].quantity * this.products[0].price;
//   					this.success_products = 2;

//   				}else{
//   					response.Product.quantity = this.searchProduct.quantity;
//   					this.products.push(response.Product);
//   					this.registry.total_price = this.registry.total_price + (response.Product.quantity * response.Product.price);
//   					this.success_products = 2;
//   				}
//   			},
//   			error => {
//   				console.log(<any>error);
//   				alert("Ha ocurrido un error al intentar obtener el producto de la base de datos");
//   			}
//   		);
//   	}
//   	else{
//   		this._inventoryService.getProductBy(this.searchProduct).subscribe(
//   			response => {  				
//   				//console.log(response);
//   				this.products_to_select = response.Product;
//   				console.log(this.products_to_select);
//   				this.success_products = 1;
//   			},
//   			error =>{
//   				console.log(<any>error);
//   				alert("Ha ocurrido un error al intentar obtener el producto de la base de datos");
//   			}
//   		);
//   	}
//   }

  //Metodo para seleccionar un producto de la lista
//   SelectProduct(product){
//   	if(this.products[0].name == ""){
//   		this.products[0] = product;
// 		console.log(this.products);  
// 		this.products[0].quantity = this.searchProduct.quantity;
// 		this.registry.total_price = this.products[0].quantity * this.products[0].price;
// 		this.success_products = 2;
//   	}
//   	else{
//   		product.quantity = this.searchProduct.quantity;
// 		this.products.push(product);
// 		this.registry.total_price = this.registry.total_price + (product.quantity * product.price);
// 		this.success_products = 2;
//   	}
//   }

  //Metodo para eliminar un producto de la lista de compra
//   removeProduct(index){
//   	//index = index -1;
//   	this.registry.total_price = this.registry.total_price - (this.products[index].price * this.products[index].quantity);
//   	if(this.products.length == 1){
//   		this.products[0] = {_id: "",name:"" ,brand:"" , price: null, description: "", category: "", quantity: null, enabled: null, registryId: [""]};
//   	}else{
//   		this.products.splice(index, 1);
// 	}
//   	this.success_products == 2;
//   }

  //Metodo para guardar todos los datos de la compra en la base de datos
//   addRegistry(){

//   	this.registry.client.name = this.clientToBuy.name;
//   	this.registry.client.surname = this.clientToBuy.surname;
//   	this.registry.client.identification = this.clientToBuy.identification;
//   	this.registry.client.id = this.clientToBuy._id;

// 	let auxiliar = {id: '',name: '', brand: '', price:null ,quantity:null};

//   	for(let index in this.products){
//   		/*
//   		if(index == 0){
// 		  	this.registry.products[0].name = this.products[0].name;
// 			this.registry.products[0].brand = this.products[0].brand;
// 			this.registry.products[0].price = this.products[0].price;
// 			this.registry.products[0].id = this.products[0]._id;
// 			this.registry.products[0].quantity = this.products[0].quantity;
// 			continue;
//   		} */
//   		auxiliar = {id: '',name: '', brand: '', price:null ,quantity:null};
//   		auxiliar.id = this.products[index]._id;
//   		auxiliar.name = this.products[index].name;
//   		auxiliar.brand = this.products[index].brand;
//   		auxiliar.price = this.products[index].price;
//   		auxiliar.quantity = this.products[index].quantity;

//   		this.registry.products.push(auxiliar);
//   	}

//   	this.registry.products.splice(0, 1);
//   	this.registry.date = "01/02/1999";
//   	//console.log(this.registry);
  	
//   	this._registryService.addRegistry(this.registry).subscribe(
//   		response => {
//   			console.log(response);
//   		},
//   		error => {
//   			console.log(<any>error);
//   			alert(error);
//   		}
//   	); 
//   }
}
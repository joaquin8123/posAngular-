'use strict'

// Modelo de producto para el inventario

export class ProductModel{

	//Modelo que continene todos los datos de un producto

	constructor(
		public id: number,
		public nombre: string,
		public marca: string,
		public categoria: string,
		public descripcion: string,
		public precio_unitario: number,
		public cantidad: number,
		public activo: boolean,
		public date_created: Date,
		){}
}
'use strict'
// Modelo de dato para clientes

export class ClientModel{

	constructor( 
		public id: number,
		public nombre: string,
		public email: string,
		public numero_documento: string,
		public localidad: string,
		public provincia: string,
		public calle: string,
		public activo: boolean,
		public cliente: boolean,
		public localidadId: number,
		public provinciaId: number,
		public tipoDocumentoId: number,
		public categoria: string
		){ };
}
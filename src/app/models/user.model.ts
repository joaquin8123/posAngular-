'use strict'
// Modelo de dato para clientes

export class UserModel{

	constructor( 
		public id: number,
		public nombre: string,
		public email: string,
		public usuario: string,
		public password: string,
		public role: string,
		public activo: boolean,
		public numero_documento: string,
		){ }
}


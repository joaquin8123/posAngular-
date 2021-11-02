'use strict'
// Modelo de dato para configuracion

export class ConfigModel{

	constructor( 
		public id: number,
		public razon_social: string,
		public direccion: string,
		public cuit: string,
		public activo: boolean,
		){ }
}


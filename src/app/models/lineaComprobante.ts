//Model de dato para los registros

export class LineaComprobante {

	constructor(
		public id: number,
		public nombre: string,
		public categoria: string,
		public descripcion:  string,
		public precio_unitario: number,
		public cantidad: number
		){ }
}
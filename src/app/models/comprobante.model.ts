//Model de dato para los registros

export class ComprobanteModel {

	constructor(
		public id: number,
		public cliente: {
			clienteId: number,
			nombre: string,
			numero_documento: string,
			email: string,
			domicilio:string
		},
		public estado: string,
		public fecha: Date,
		public total: number,
		public total_con_descuentos: number,
		public descuento: number,
		public terminoPagoId: number,
		public producto:{
				productoId: number,
				nombre: string,
				categoria: string,
				descripcion:  string,
				precio_unitario: number,
				cantidad: number,
		}
		){ }
}
export interface DataReporteGeneral {
    SEMANA: number,
	NOMBRE_TIENDA: string,
	FECHA_INICIO: Date | string,
	FECHA_FIN: Date | string,
	COMENTARIO: string,
	DURACION_MINUTOS:string,
	HOUR?:number
}
export class ventas{
    idCompra: number;
    fecha: Date;
    monto: number;
    idEdo: number;
    idCliente: number;
    idDomicilio: number;
    constructor(){
        this.idCompra = 0;
        this.fecha = new Date();
        this.monto = 0;
        this.idEdo = 0;
        this.idCliente = 0;
        this.idDomicilio = 0;
    }
}
export class intervaloFecha{
    fechaInicio: string;
    fechaFin: string;
    constructor(){
        this.fechaInicio = '';
        this.fechaFin = '';
    }
    setDatos(fechaInicio:string, fechaFin:string){
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }
}

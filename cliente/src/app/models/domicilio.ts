export class Domicilio{
    idDomicilio: number;
    calle: string;
    colonia:string;
    ciudad:string;
    estado: string;
    cp: number;
    idCliente: number;
    numero: number;

    constructor()
    {
        this.idDomicilio = 0;
        this.calle = '';
        this.colonia = '';
        this.ciudad = '';
        this.estado = '';
        this.cp = 0;
        this.idCliente = 0;
        this.numero = 0;
    }
}
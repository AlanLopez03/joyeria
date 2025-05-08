export class Compra{

    fecha: string;
    idEdo: number;
    idDomicilio: number;
    constructor(){
 
        this.fecha="";
        this.idEdo=0;
        this.idDomicilio=0;
    }
    set(fecha:string,idEdo:number,idDomicilio:number){
  
        this.fecha=fecha;
        this.idEdo=idEdo;
        this.idDomicilio=idDomicilio;

    }
}
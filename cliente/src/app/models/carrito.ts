export class Carrito{
    idProducto:number;
    nombre:string;
    name:string;
    cantidad:number;
    precio:number;
    stock:number;
    descuento:number;
    foto: number;

    constructor(){
        this.idProducto=1;
        this.nombre="";
        this.name='';
        this.cantidad=0;
        this.precio=0;
        this.stock=0;
        this.descuento=0;
        this.foto = 0;
    }

}
export class addProducto{
    idProducto:number;
    idCliente:number;
    cantidad:number;
    constructor(){
        this.idCliente=0;
        this.idProducto=0;
        this.cantidad=0;
    }
    setAtributos(idProducto:number,idCliente:number,cantidad:number){
        this.idProducto=idProducto;
        this.idCliente=idCliente;
        this.cantidad=cantidad;
    }
}
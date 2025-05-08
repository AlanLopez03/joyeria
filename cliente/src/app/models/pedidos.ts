    export class Pedidos {
    idPedido: number;
    cantidadProducto: number;
    subtotal: number;
    idCompra:   number;
    idProducto: number;
    constructor(){
        this.idPedido = 0;
        this.cantidadProducto = 0;
        this.subtotal = 0;
        this.idCompra = 0;
        this.idProducto = 0;
    }
}
export class nuevoPedido
{
    cantidadProducto: number;
    subtotal: number;
    idCompra:   number;
    idProducto: number;
    constructor(){
        this.cantidadProducto = 0;
        this.subtotal = 0;
        this.idCompra = 0;
        this.idProducto = 0;
    }
}
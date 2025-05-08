export class Producto{
    idProducto: number;
    nombre: string;
    name : string;
    descripcion: string;
    description: string;
    stock: number;
    precio: number;
    descuento: number;
    inicio_descuento: string;
    fin_descuento: string;
    idMaterial: number;
    idCategoria: number;
    idMarca: number;
    foto: number;
    constructor(){
        this.idProducto = 1;
        this.nombre = '';
        this.name = '';
        this.descripcion = '';
        this.description = '';
        this.stock = 1;
        this.precio = 1;
        this.descuento = 1;
        this.inicio_descuento =  '';
        this.fin_descuento = '';
        this.idMaterial = 1;
        this.idCategoria = 1;
        this.idMarca = 1;
        this.foto = 0;
    }
}
export class Marca{
    idMarca: number;
    nombre: string;
    constructor(){
        this.idMarca = 1;
        this.nombre = '';
    }
    set(idMarca: number) {
        this.idMarca = idMarca;
    }
}
export class Categoria {
    idCategoria: number;
    nombre: string;
    name :string;

    constructor() {
        this.idCategoria = 1;
        this.nombre = "";
        this.name = "";

    }
    set(idCategoria: number) {
        this.idCategoria = idCategoria;

    }
}
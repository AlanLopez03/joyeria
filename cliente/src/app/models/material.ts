export class Material {
    idMaterial: number;
    nombre: string;
    name: string;
    constructor(){
        this.idMaterial = 1;
        this.nombre = '';
        this.name='';
    }
    set(idMaterial: number) {
        this.idMaterial = idMaterial;
    }
}
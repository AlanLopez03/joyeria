export class getUsuario {
    idUsuario: number;
    nombre: string;
    //apellido: string;
    correo: string;
    username: string;
    password: string;
    idRol: number;
    foto: Number;
    constructor() {
        this.idUsuario = 1;
        this.nombre = '';//Unir nombre y apellido
        //this.apellido = '';
        this.correo = '';
        this.username = '';
        this.password = '';
        this.idRol = 2;
        this.foto = 0;
    }
}
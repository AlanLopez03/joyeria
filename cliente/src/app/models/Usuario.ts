export class Usuario {
    nombre: string;
    //apellido: string;
    correo: string;
    username: string;
    password: string;
    idRol: number;
    foto: number;
    constructor() {

        this.nombre = '';//Unir nombre y apellido
        this.correo = '';
        this.username = '';
        this.password = '';
        this.idRol = 2;
        this.foto = 0;
    }
}
export class UsuarioPassword {
    password: string;
    password1: string;
    constructor() {
        this.password = '';
        this.password1 = '';
    }
}

import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/Usuario';
import Swal from 'sweetalert2'
import { CorreoService } from '../../services/correo/correo.service';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrl: './recuperar-password.component.css'
})
export class RecuperarPasswordComponent {

  usuario: Usuario = new Usuario();
  constructor(private usuarioService: UsuarioService, private router: Router,private correoService:CorreoService) { }

  enviarCorreo() {

    if (this.usuario.correo == ""){
      Swal.fire({
        title: 'Error',
        text: 'Ingrese un correo para reestablecer la contraseña',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      return;
    }
    else{
      this.usuarioService.existeC(this.usuario.correo).subscribe((res:any) =>{
        if (res != null){
            this.correoService.enviarCorreoRecuperarContrasenya(this.usuario).subscribe((resUsuario: any) =>
              {
                console.log(resUsuario) ;
              },err => console.error(err));
          Swal.fire({
            title: 'Correo enviado',
            text: 'Verifique su bandeja de entrada para reestablecer la contraseña',
            icon: 'info',
            confirmButtonText: 'Aceptar'
          })
          this.router.navigateByUrl('/login');
        }
        else{
          Swal.fire({
            title: 'Error',
            text: 'Correo invalido',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
      })
    }
  }

}
import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/Usuario';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrl: './registrar-usuario.component.css'
})
export class RegistrarUsuarioComponent {
  usuario: Usuario = new Usuario();
  constructor(private usuarioService: UsuarioService, private router: Router,private translate:TranslateService) { }

  registrarUsuario() {
  if (this.usuario.nombre != null &&  this.usuario.correo != null && this.usuario.password != null && this.usuario.username!=null){
    this.usuario.foto = 0;
    this.usuarioService.crearUsuario(this.usuario).subscribe(
      res => {//Pa cuando se implemente lo del idioma en el registro
     //   this.translate.get('registroExitoso').subscribe((translations) =>
     //   {
     //     Swal.fire({
     //     position: 'center',
     //     icon: 'success',
     //     title: translations.title,
     //     showConfirmButton: false,
     //     confirmButtonText: translations.confirm,
     //     timer: 1500
     //   })
     //   this.router.navigateByUrl('/login');
     // })
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Registro Exitoso',
        showConfirmButton: false,
        timer: 1500
      })
      this.router.navigateByUrl('/login');
        
      },
      err => console.log(err)
    )
  }else
  //this.translate.get('datosIncompletos').subscribe((translations) => 
  //  {
  //    Swal.fire({
  //    position: 'center',
  //    icon: 'error',
  //    title: translations.title,
  //    text: translations.text,
  //    showConfirmButton: true,
  //    confirmButtonText: translations.confirm,
  //    timer: 1500
  //  })});
  //}
  Swal.fire({
    position: 'center',
    icon: 'error',
    title: 'Datos Incompletos',
    text: 'Por favor complete todos los campos',
    showConfirmButton: true,
    timer: 1500
  })
  }
}

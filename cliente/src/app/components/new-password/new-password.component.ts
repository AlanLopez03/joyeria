import { Component,OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { UsuarioPassword } from '../../models/Usuario';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent implements OnInit{
  token : string = "";

  usuario: UsuarioPassword = new UsuarioPassword();
  constructor(private usuarioService: UsuarioService, private router: Router, private route: ActivatedRoute,private translate: TranslateService) { }

  enviarPassword() {
    if(this.usuario.password == "" || this.usuario.password1 ==""){
      this.translate.get('contraVacia').subscribe((translations) =>
        {
          Swal.fire({
            title: translations.title,
            text: translations.text,
            icon: 'warning',
            confirmButtonText: translations.confirm
          })
          return;
      })
    }
    else{
      if (this.usuario.password != this.usuario.password1){
       this.translate.get('contraNoCoinciden').subscribe((translations) =>{
        Swal.fire({
          title: translations.title,
          text: translations.text,
          icon: 'warning',
          confirmButtonText: translations.confirm
        })
        return;
       });
      }
      else{
        this.usuarioService.actualizarPassword(this.token, this.usuario.password).subscribe((res : any) => {
          console.log(res);
          this.translate.get('contraExito').subscribe((translations) =>
          {
            Swal.fire({
              title: translations.title,
              text: translations.text,
              icon: 'success',
              confirmButtonText: translations.confirm
            })
          })
          this.router.navigateByUrl("")
        }, err => console.error(err));
      }
    }
  }
  ngOnInit():void{
    this.route.params.subscribe(params => {
      this.token = params['token'];
      console.log(this.token);
    });
  }
}

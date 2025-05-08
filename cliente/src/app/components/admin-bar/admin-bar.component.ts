import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../models/Usuario';
import { IdiomaService } from '../../services/idioma/idioma.service';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-admin-bar',
  templateUrl: './admin-bar.component.html',
  styleUrl: './admin-bar.component.css'
})
export class AdminBarComponent implements OnInit{
  usuario = new Usuario();
  idUsuario = localStorage.getItem('idUsuario');

constructor(private usuarioService:UsuarioService ,private router:Router,private idiomaService:IdiomaService,private location: Location ,private translate: TranslateService) {
  
 }
  ngOnInit(): void 
  {
    $(document).ready(function(){
      $('.dropdown-trigger').dropdown();
    });

    this.usuarioService.listone(this.idUsuario).subscribe((resUsuarios:any) => {
      this.usuario = resUsuarios;
      console.log(this.usuario);
    }, err => console.log(err));
    this.idiomaService.currentLanguage.subscribe((res: any) => {
      this.translate.use(res);
    })
    
  }
  reloadPage() {
    const currentUrl = this.location.path();
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([currentUrl]);
  });}
  logOut(){//Funciona para cerrar sesion pero no se como hacer para que se cierre la sesion en el servidor
    //console.log('salir');
    //console.log(localStorage.getItem('idUsuario'));
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('idioma');
    this.idiomaService.resetLanguage();
    this.router.navigateByUrl('/');

  }
  cambiarIdioma(idioma: string) {
    //console.log(idioma);
    this.idiomaService.changeLanguage(idioma);
    //this.reloadPage();
  
  }

}

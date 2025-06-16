import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistrarUsuarioComponent } from './components/registrar-usuario/registrar-usuario.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { ControlComponent } from './components/control/control.component';
import { ModificarUsuarioComponent } from './components/modificar-usuario/modificar-usuario.component';
import { CarritoComponent } from './components/carrito/carrito.component';
import { MostrarProductosComponent } from './components/mostrar-productos/mostrar-productos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { UsuarioComprasComponent } from './components/usuario-compras/usuario-compras.component';
import { RecuperarPasswordComponent } from './components/recuperar-password/recuperar-password.component';
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EscogerDomicilioComponent } from './components/escoger-domicilio/escoger-domicilio.component';
import { OfertasComponent } from './components/ofertas/ofertas.component';
import { VerProductoComponent } from './components/ver-producto/ver-producto.component';
import { InfoEmpresaComponent } from './components/info-empresa/info-empresa.component';
import { OfertaUsuarioComponent } from './components/oferta-usuario/oferta-usuario.component';
const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" }, { path: 'login', component: LoginComponent, },

  {
    path: 'home', component: InicioComponent,
    children:
      [
        { path: 'carrito', redirectTo: 'carrito', pathMatch: 'full' },
        { path: 'carrito', component: CarritoComponent, },
        { path: "", component: MostrarProductosComponent, },
        { path: 'usuarioCompras', redirectTo: 'usuarioCompras', pathMatch: 'full' }, { path: 'usuarioCompras', component: UsuarioComprasComponent, },
        { path: 'perfil', component: PerfilComponent },
        { path: 'escogerDomicilio', component: EscogerDomicilioComponent },
        { path: 'verProducto/:id', component: VerProductoComponent },
        { path: 'sobre-nosotros', component: InfoEmpresaComponent },
        { path: 'ofertas', redirectTo: 'ofertas', pathMatch: 'full' }, { path: 'ofertas', component: OfertaUsuarioComponent },

      ]
  },
  {
    path: 'control', component: ControlComponent, children:
      [
        {path: '', redirectTo: 'inventario', pathMatch: 'full' },
        { path: 'inventario', redirectTo: 'inventario', pathMatch: 'full' }, { path: 'inventario', component: InventarioComponent, },
        { path: 'pedidos', redirectTo: 'pedidos', pathMatch: 'full' }, { path: 'pedidos', component: PedidosComponent, },
        { path: 'reportes', redirectTo: 'reportes', pathMatch: 'full' }, { path: 'reportes', component: ReportesComponent, },
        { path: 'modificarUsuario', redirectTo: 'modificarUsuario', pathMatch: 'full' }, { path: 'modificarUsuario', component: ModificarUsuarioComponent, },
        {path:'ofertas',redirectTo:'ofertas',pathMatch:'full'},{path:'ofertas',component:OfertasComponent,}
        
      ]
  },
  { path: 'nuevoUsuario', component: RegistrarUsuarioComponent, },
  { path: 'recuperarPassword', component: RecuperarPasswordComponent, },
  { path: 'restablecerPassword/:token', component: NewPasswordComponent, },

  //{path:'control',redirectTo: 'control',pathMatch: 'full'},{path:'control',component:ControlComponent,},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

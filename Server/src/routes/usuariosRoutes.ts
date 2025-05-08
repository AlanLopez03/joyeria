import { Router } from 'express';
import { usuariosController } from '../controllers/usuariosController';

class UsuariosRoutes{
    public router: Router=Router();
    constructor(){
        this.config();
    }
    
    config() : void{
        //Ya funciona el crud
        this.router.post('/crearUsuario', usuariosController.create);
        this.router.put('/actualizar/:id',usuariosController.update);//ya funciona
        this.router.put('/actualizarFoto/:id',usuariosController.updateFoto);//ya funciona
        this.router.delete('/eliminar/:id',usuariosController.delete);
        this.router.get('/recomendaciones/:id', usuariosController.recomendaciones)
        this.router.get('/', usuariosController.list );
        this.router.get('/:id', usuariosController.listOne );
        this.router.get('/verPedidos/:id', usuariosController.verPedidos );
        this.router.get('/rastrearPedidos/:id', usuariosController.rastrearPedidos );
        this.router.post('/buscarUsuario', usuariosController.buscarUsuarioporAtributo );
        this.router.get('/login/:correo/:password',  usuariosController.login );
        this.router.post('/existeC',  usuariosController.existeCorreo );
        this.router.put('/reestablecerPassword/:token',usuariosController.actualizarPassword);
        //this.router.post('/modificarEstadoPedido/:id', usuariosController.modificarEstadoPedido );
        }
}
const usuariosRoutes= new UsuariosRoutes();
export default usuariosRoutes.router;
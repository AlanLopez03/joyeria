import { Router } from 'express';
import { carritoController } from '../controllers/carritoController';

class CarritoRoutes{
    public router: Router=Router();
    constructor(){
        this.config();
    }
    
    config() : void{
        //Ya funciona el crud
        this.router.post('/insertarProducto', carritoController.insertarProducto);
        this.router.get('/verCarrito/:id', carritoController.verCarrito);
        this.router.delete('/limpiarCarrito/:id', carritoController.limpiarCarrito);
        this.router.delete('/eliminarProducto/:id', carritoController.eliminarProducto);
        //this.router.get('/buscar/:id', carritoController.buscar);
        this.router.get('/listarCompras/:id', carritoController.listarCompras);
        //this.router.post('/crearUsuario', carritoController.create);
        //this.router.put('/actualizar/:id',carritoController.update);//ya funciona
        //this.router.delete('/eliminar/:id',carritoController.delete);
        //this.router.get('/', carritoController.list );
        //this.router.get('/:id', carritoController.listOne );
        //this.router.get('/verPedidos/:id', carritoController.verPedidos );
        //this.router.get('/rastrearPedidos/:id', carritoController.rastrearPedidos );
        //this.router.post('/modificarEstadoPedido/:id', carritoController.modificarEstadoPedido );
        }
}
const carritoRoutes= new CarritoRoutes();
export default carritoRoutes.router;
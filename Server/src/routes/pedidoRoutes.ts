import { Router } from 'express';
import { pedidoController } from '../controllers/pedidoController';

class PedidoRoutes{
    public router: Router=Router();
    constructor(){
        this.config();
    }
    
    config() : void{
        //Ya funciona el crud
        this.router.post('/crearPedido', pedidoController.create);
        this.router.put('/actualizar/:id',pedidoController.update);//ya funciona
        this.router.delete('/eliminar/:id',pedidoController.delete);
        this.router.get('/gestionarPedidos', pedidoController.gestionarPedidos );
        this.router.get('/', pedidoController.list );
        this.router.get('/:id', pedidoController.listOne );
        this.router.get('/verPedidos/:id', pedidoController.verPedidos );
        //this.router.put('/modificarEstadoPedido/:id', pedidoController.modificarEstadoPedido );
        }
}
const pedidoRoutes= new PedidoRoutes();
export default pedidoRoutes.router;
import { Router } from 'express';
import { estadocompraController } from '../controllers/estadoCompraController';

class EstadoCompraRoutes{
    public router: Router=Router();
    constructor(){
        this.config();
    }
    
    config() : void{
        //Ya funciona el crud
        this.router.post('/crearEstadoCompra', estadocompraController.create);
        this.router.put('/actualizar/:id',estadocompraController.update);//ya funciona
        this.router.delete('/eliminar/:id',estadocompraController.delete);
        this.router.get('/', estadocompraController.list );
        this.router.get('/:id', estadocompraController.listOne );
        }
}
const estadocompraRoutes= new EstadoCompraRoutes();
export default estadocompraRoutes.router;
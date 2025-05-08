import { Router } from 'express';
import { compraController } from '../controllers/compraController';

class CompraRoutes{
    public router: Router=Router();
    constructor(){
        this.config();
    }
    
    config() : void{
        this.router.post('/verVentas', compraController.Ventas );
        this.router.post('/crearCompra/:id', compraController.crearCompra);
        this.router.put('/actualizar/:id',compraController.update);
        this.router.delete('/eliminar/:id',compraController.delete);
        this.router.post('/verMasVendidos', compraController.verMasVendidos );//se debe poner este primero para que no se confunda con el de abajo
        this.router.post('/verMenosVendidos', compraController.verMenosVendidos );
        this.router.get('/', compraController.list)
        this.router.get('/:id', compraController.listOne );
        this.router.put('/modificarEstadoCompra/:id',compraController.modificarEstadoCompra);
        this.router.get('/verCompras/:id', compraController.buscarComprasUsuario);

        


        }
}
const compraRoutes= new CompraRoutes();
export default compraRoutes.router;
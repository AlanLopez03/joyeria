import { Router } from 'express';
import { productoController } from '../controllers/productoController';

class ProductoRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/crearProducto', productoController.create);
        this.router.put('/actualizar/:id', productoController.update);//ya funciona
        this.router.put('/actualizarFoto/:id', productoController.updateFoto);//ya funciona
        this.router.delete('/eliminar/:id', productoController.delete);
        this.router.get('/verOfertas', productoController.verOfertas);//Por algun motivo debe ir aqui,si no es así no funciona
        this.router.get('/', productoController.list);
        this.router.get('/:id', productoController.listOne);
        this.router.put('/aplicarDescuento/:id', productoController.aplicarDescuento);
        this.router.get('/filtrarProductos/:id', productoController.filtrarProductos);
        this.router.post('/buscarNombre', productoController.buscarporNombre);
        this.router.put('/agregarStock/:id', productoController.agregarStock);
        this.router.get('/buscarporCategoria/:id', productoController.buscarbyCategoria);
        this.router.get('/buscarProducto/:nombre/:idioma', productoController.buscar_producto);
    }
}

const productoRoutes = new ProductoRoutes();
export default productoRoutes.router;
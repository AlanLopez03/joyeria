"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productoController_1 = require("../controllers/productoController");
class ProductoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/crearProducto', productoController_1.productoController.create);
        this.router.put('/actualizar/:id', productoController_1.productoController.update); //ya funciona
        this.router.put('/actualizarFoto/:id', productoController_1.productoController.updateFoto); //ya funciona
        this.router.delete('/eliminar/:id', productoController_1.productoController.delete);
        this.router.get('/verOfertas', productoController_1.productoController.verOfertas); //Por algun motivo debe ir aqui,si no es así no funciona
        this.router.get('/', productoController_1.productoController.list);
        this.router.get('/:id', productoController_1.productoController.listOne);
        this.router.put('/aplicarDescuento/:id', productoController_1.productoController.aplicarDescuento);
        this.router.get('/filtrarProductos/:id', productoController_1.productoController.filtrarProductos);
        this.router.post('/buscarNombre', productoController_1.productoController.buscarporNombre);
        this.router.put('/agregarStock/:id', productoController_1.productoController.agregarStock);
        this.router.get('/buscarporCategoria/:id', productoController_1.productoController.buscarbyCategoria);
        this.router.get('/buscarProducto/:nombre/:idioma', productoController_1.productoController.buscar_producto);
    }
}
const productoRoutes = new ProductoRoutes();
exports.default = productoRoutes.router;

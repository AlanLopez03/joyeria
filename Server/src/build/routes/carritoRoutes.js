"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const carritoController_1 = require("../controllers/carritoController");
class CarritoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Ya funciona el crud
        this.router.post('/insertarProducto', carritoController_1.carritoController.insertarProducto);
        this.router.get('/verCarrito/:id', carritoController_1.carritoController.verCarrito);
        this.router.delete('/limpiarCarrito/:id', carritoController_1.carritoController.limpiarCarrito);
        this.router.delete('/eliminarProducto/:id', carritoController_1.carritoController.eliminarProducto);
        //this.router.get('/buscar/:id', carritoController.buscar);
        this.router.get('/listarCompras/:id', carritoController_1.carritoController.listarCompras);
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
const carritoRoutes = new CarritoRoutes();
exports.default = carritoRoutes.router;

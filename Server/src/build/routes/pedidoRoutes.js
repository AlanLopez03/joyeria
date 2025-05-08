"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pedidoController_1 = require("../controllers/pedidoController");
class PedidoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Ya funciona el crud
        this.router.post('/crearPedido', pedidoController_1.pedidoController.create);
        this.router.put('/actualizar/:id', pedidoController_1.pedidoController.update); //ya funciona
        this.router.delete('/eliminar/:id', pedidoController_1.pedidoController.delete);
        this.router.get('/gestionarPedidos', pedidoController_1.pedidoController.gestionarPedidos);
        this.router.get('/', pedidoController_1.pedidoController.list);
        this.router.get('/:id', pedidoController_1.pedidoController.listOne);
        this.router.get('/verPedidos/:id', pedidoController_1.pedidoController.verPedidos);
        //this.router.put('/modificarEstadoPedido/:id', pedidoController.modificarEstadoPedido );
    }
}
const pedidoRoutes = new PedidoRoutes();
exports.default = pedidoRoutes.router;

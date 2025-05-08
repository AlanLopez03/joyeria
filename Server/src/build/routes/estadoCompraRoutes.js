"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estadoCompraController_1 = require("../controllers/estadoCompraController");
class EstadoCompraRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Ya funciona el crud
        this.router.post('/crearEstadoCompra', estadoCompraController_1.estadocompraController.create);
        this.router.put('/actualizar/:id', estadoCompraController_1.estadocompraController.update); //ya funciona
        this.router.delete('/eliminar/:id', estadoCompraController_1.estadocompraController.delete);
        this.router.get('/', estadoCompraController_1.estadocompraController.list);
        this.router.get('/:id', estadoCompraController_1.estadocompraController.listOne);
    }
}
const estadocompraRoutes = new EstadoCompraRoutes();
exports.default = estadocompraRoutes.router;

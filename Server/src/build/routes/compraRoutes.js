"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compraController_1 = require("../controllers/compraController");
class CompraRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/verVentas', compraController_1.compraController.Ventas);
        this.router.post('/crearCompra/:id', compraController_1.compraController.crearCompra);
        this.router.put('/actualizar/:id', compraController_1.compraController.update);
        this.router.delete('/eliminar/:id', compraController_1.compraController.delete);
        this.router.post('/verMasVendidos', compraController_1.compraController.verMasVendidos); //se debe poner este primero para que no se confunda con el de abajo
        this.router.post('/verMenosVendidos', compraController_1.compraController.verMenosVendidos);
        this.router.get('/', compraController_1.compraController.list);
        this.router.get('/:id', compraController_1.compraController.listOne);
        this.router.put('/modificarEstadoCompra/:id', compraController_1.compraController.modificarEstadoCompra);
        this.router.get('/verCompras/:id', compraController_1.compraController.buscarComprasUsuario);
    }
}
const compraRoutes = new CompraRoutes();
exports.default = compraRoutes.router;

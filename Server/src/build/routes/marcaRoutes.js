"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const marcaController_1 = require("../controllers/marcaController");
class MarcaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Ya funciona el crud
        this.router.post('/crearMarca', marcaController_1.marcaController.create);
        this.router.put('/actualizar/:id', marcaController_1.marcaController.update); //ya funciona
        this.router.delete('/eliminar/:id', marcaController_1.marcaController.delete);
        this.router.get('/', marcaController_1.marcaController.list);
        this.router.get('/:id', marcaController_1.marcaController.listOne);
    }
}
const marcaRoutes = new MarcaRoutes();
exports.default = marcaRoutes.router;

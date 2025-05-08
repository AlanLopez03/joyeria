"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const domicilioController_1 = require("../controllers/domicilioController");
class DomicilioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Ya funciona el crud
        this.router.post('/crearDomicilio', domicilioController_1.domicilioController.create);
        this.router.put('/actualizar/:id', domicilioController_1.domicilioController.update); //ya funciona
        this.router.delete('/eliminar/:id', domicilioController_1.domicilioController.delete);
        this.router.get('/', domicilioController_1.domicilioController.list);
        this.router.get('/:id', domicilioController_1.domicilioController.listOne);
    }
}
const domicilioRoutes = new DomicilioRoutes();
exports.default = domicilioRoutes.router;

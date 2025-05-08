"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ofertaController_1 = require("../controllers/ofertaController");
class OfertaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/crear', ofertaController_1.ofertaController.create);
        this.router.post('/create1', ofertaController_1.ofertaController.create1);
        this.router.put('/actualizar/:id', ofertaController_1.ofertaController.update);
        this.router.delete('/delete/:id', ofertaController_1.ofertaController.delete);
        this.router.get('/', ofertaController_1.ofertaController.list);
        this.router.get('/:id', ofertaController_1.ofertaController.listOne);
    }
}
const ofertaRoutes = new OfertaRoutes();
exports.default = ofertaRoutes.router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const materialController_1 = require("../controllers/materialController");
class MaterialRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Ya funciona el crud
        this.router.post('/crearMaterial', materialController_1.materialController.create);
        this.router.put('/actualizar/:id', materialController_1.materialController.update); //ya funciona
        this.router.delete('/eliminar/:id', materialController_1.materialController.delete);
        this.router.get('/', materialController_1.materialController.list);
        this.router.get('/:id', materialController_1.materialController.listOne);
    }
}
const materialRoutes = new MaterialRoutes();
exports.default = materialRoutes.router;

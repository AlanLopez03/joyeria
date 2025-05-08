"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rolesController_1 = require("../controllers/rolesController");
class RolesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Ya funciona el crud
        this.router.post('/crearRol', rolesController_1.rolesController.create);
        this.router.put('/actualizar/:id', rolesController_1.rolesController.update); //ya funciona
        this.router.delete('/eliminar/:id', rolesController_1.rolesController.delete);
        this.router.get('/', rolesController_1.rolesController.list);
        this.router.get('/:id', rolesController_1.rolesController.listOne);
    }
}
const rolesRoutes = new RolesRoutes();
exports.default = rolesRoutes.router;

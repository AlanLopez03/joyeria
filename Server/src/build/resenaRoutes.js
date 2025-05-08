"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const resenaController_1 = require("../controllers/resenaController");
class ResenaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Ya funciona el crud
        this.router.post('/crearUsuario', resenaController_1.resenaController.create);
        this.router.put('/actualizar/:id', resenaController_1.resenaController.update); //ya funciona
        this.router.delete('/eliminar/:id', resenaController_1.resenaController.delete);
        this.router.get('/', resenaController_1.resenaController.list);
        this.router.get('/:id', resenaController_1.resenaController.listOne);
    }
}
const usuariosRoutes = new ResenaRoutes();
exports.default = usuariosRoutes.router;

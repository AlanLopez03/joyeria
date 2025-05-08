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
        this.router.get('/verResenas', resenaController_1.resenaController.list);
        this.router.get('/verResena/:id', resenaController_1.resenaController.listOne);
        this.router.post('/crearResena', resenaController_1.resenaController.create);
        this.router.put('/actualizarResena/:id', resenaController_1.resenaController.update); //ya funciona
        this.router.delete('/eliminarResena/:id', resenaController_1.resenaController.delete);
    }
}
const usuariosRoutes = new ResenaRoutes();
exports.default = usuariosRoutes.router;

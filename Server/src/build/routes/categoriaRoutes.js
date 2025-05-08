"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoriaController_1 = require("../controllers/categoriaController");
class CategoriaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Ya funciona el crud
        this.router.post('/crearCategoria', categoriaController_1.categoriaController.create);
        this.router.put('/actualizar/:id', categoriaController_1.categoriaController.update); //ya funciona
        this.router.delete('/eliminar/:id', categoriaController_1.categoriaController.delete);
        this.router.get('/', categoriaController_1.categoriaController.list);
        this.router.get('/:id', categoriaController_1.categoriaController.listOne);
    }
}
const categoriaRoutes = new CategoriaRoutes();
exports.default = categoriaRoutes.router;

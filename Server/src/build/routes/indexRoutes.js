"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import { empresasController } from '../controllers/empresasController';
class IndexRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/pelon', (req, res) => res.send('probando ruta'));
        //this.router.get('/create/',empresasController.create)
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;

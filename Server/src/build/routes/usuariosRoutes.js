"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Ya funciona el crud
        this.router.post('/crearUsuario', usuariosController_1.usuariosController.create);
        this.router.put('/actualizar/:id', usuariosController_1.usuariosController.update); //ya funciona
        this.router.put('/actualizarFoto/:id', usuariosController_1.usuariosController.updateFoto); //ya funciona
        this.router.delete('/eliminar/:id', usuariosController_1.usuariosController.delete);
        this.router.get('/recomendaciones/:id', usuariosController_1.usuariosController.recomendaciones);
        this.router.get('/', usuariosController_1.usuariosController.list);
        this.router.get('/:id', usuariosController_1.usuariosController.listOne);
        this.router.get('/verPedidos/:id', usuariosController_1.usuariosController.verPedidos);
        this.router.get('/rastrearPedidos/:id', usuariosController_1.usuariosController.rastrearPedidos);
        this.router.post('/buscarUsuario', usuariosController_1.usuariosController.buscarUsuarioporAtributo);
        this.router.get('/login/:correo/:password', usuariosController_1.usuariosController.login);
        this.router.post('/existeC', usuariosController_1.usuariosController.existeCorreo);
        this.router.put('/reestablecerPassword/:token', usuariosController_1.usuariosController.actualizarPassword);
        //this.router.post('/modificarEstadoPedido/:id', usuariosController.modificarEstadoPedido );
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;

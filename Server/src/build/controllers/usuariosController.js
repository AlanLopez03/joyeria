"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuariosController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = __importDefault(require("../database"));
class UsuariosController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, password } = req.params;
            //Se supone que son correos unicos
            const respuesta = yield database_1.default.query('SELECT * FROM usuarios WHERE correo = ? ', [correo]);
            if (respuesta.length > 0)
                //Compara la contraseña ingresada con la contraseña encriptada en la base de datos y devuelve un booleano
                if (yield bcryptjs_1.default.compare(password, respuesta[0].password)) {
                    res.json(respuesta[0]);
                    return;
                }
            //El usuario no existe o la contraseña es incorrecta
            res.json(false);
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta = yield database_1.default.query('SELECT * from usuarios');
                res.json(respuesta);
            }
            catch (_a) {
                res.json(false);
            }
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM usuarios WHERE idUsuario = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.json(false);
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(10);
            req.body.password = yield bcryptjs_1.default.hash(req.body.password, salt);
            try {
                const resp = yield database_1.default.query("INSERT INTO usuarios set ?", [req.body]);
                res.json(resp);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.params);
            //console.log(id)
            const resp = yield database_1.default.query("UPDATE usuarios set ? WHERE idUsuario = ?", [req.body, id]);
            res.json(resp);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query("DELETE FROM usuarios WHERE idUsuario =?", [id]);
            res.json(resp);
        });
    }
    verPedidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const respuesta = yield database_1.default.query("SELECT pe.idPedido,pro.idProducto,pe.cantidadProducto,pe.subtotal FROM pedido pe JOIN compra co on pe.idCompra=co.idCompra join producto pro on pro.idProducto= pe.idProducto join usuarios usr ON usr.idUsuario=co.idCliente WHERE usr.idUsuario=?", [id]);
                if (respuesta.length > 0)
                    res.json(respuesta);
                else
                    res.json(false);
            }
            catch (error) {
                res.json(error);
            }
        });
    }
    rastrearPedidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(id);
            const respuesta = yield database_1.default.query("SELECT pe.idPedido,pro.idProducto,pe.cantidadProducto,pe.subtotal FROM pedido pe JOIN compra co on pe.idCompra=co.idCompra join producto pro on pro.idProducto= pe.idProducto join usuarios usr ON usr.idUsuario=co.idCliente WHERE pe.idPedido=?", [id]);
            if (respuesta.length > 0 && respuesta[0].idPedido == id) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Este pedido no existe' });
        });
    }
    //No se si lo vamos a usar
    recomendaciones(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query("SELECT pro.idProducto, SUM(pe.cantidadProducto) AS totalComprado FROM producto pro JOIN pedido pe ON pe.idProducto = pro.idProducto JOIN compra co ON co.idCompra = pe.idCompra WHERE co.idCliente = ? GROUP BY pro.idProducto ORDER BY totalComprado DESC LIMIT 5", [id]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            else {
                //console.log("entro");
                const respuesta = yield database_1.default.query("SELECT * FROM producto ORDER BY RAND() LIMIT 5");
                res.json(respuesta);
                return;
            }
        });
    }
    buscarUsuarioporAtributo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { valor } = req.body;
            const respuesta = yield database_1.default.query("SELECT * FROM usuarios WHERE nombre like" + "'%" + valor + "%'");
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            res.json(false);
        });
    }
    existeCorreo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo } = req.body;
            const resp = yield database_1.default.query("SELECT * FROM usuarios WHERE correo = ?", correo);
            if (resp.length > 0) {
                res.json(resp);
                return;
            }
            res.json(null);
        });
    }
    actualizarPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            //Destokenizamos
            const decoded = decodeJWT(token);
            console.log(decoded);
            const salt = yield bcryptjs_1.default.genSalt(10);
            req.body.password = yield bcryptjs_1.default.hash(req.body.password, salt);
            const resp = yield database_1.default.query("UPDATE usuarios set ? WHERE correo = ?", [req.body, decoded]);
            res.json(resp);
        });
    }
    updateFoto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(id);
            const resp = yield database_1.default.query("UPDATE usuarios set foto = 1 WHERE idUsuario = ?", id);
            console.log("Despues del update de foto");
            res.json(resp);
        });
    }
}
function decodeJWT(token) {
    return (Buffer.from(token.split('.')[1], 'base64').toString());
}
exports.usuariosController = new UsuariosController();

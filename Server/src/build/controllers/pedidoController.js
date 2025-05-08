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
exports.pedidoController = void 0;
const database_1 = __importDefault(require("../database"));
class PedidoController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM pedido');
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            res.json(false);
        });
    }
    gestionarPedidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta = yield database_1.default.query('SELECT * FROM pedido join compra on compra.idCompra=pedido.idPedido where idEdo!=1');
                if (respuesta.length > 0) {
                    res.json(respuesta);
                    return;
                }
            }
            catch (error) {
                res.json(false);
            }
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const respuesta = yield database_1.default.query('SELECT * FROM pedido WHERE idPedido = ?', [id]);
                if (respuesta.length > 0) {
                    res.json(respuesta[0]);
                    return;
                }
                res.json(false);
            }
            catch (error) {
                res.json(false);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO pedido set ?", [req.body]);
            res.json(resp);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.params);
            //console.log(id)
            const resp = yield database_1.default.query("UPDATE pedido set ? WHERE idPedido = ?", [req.body, id]);
            res.json(resp);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query("DELETE FROM pedido WHERE idPedido =?", [id]);
            res.json(resp);
        });
    }
    modificarEstadoPedido(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { estado } = req.body; //Se tiene que llamar igual que en la peticion de insomnia
            console.log(id);
            console.log(estado);
            const respuesta = yield database_1.default.query("UPDATE pedido set estado=? WHERE idPedido = ?", [estado, id]);
            //console.log(respuesta);
            res.json(respuesta);
            return;
            //res.status(404).json({'mensaje': 'El pedido no existe o el estado es nulo'});
        });
    }
    verPedidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const respuesta = yield database_1.default.query("SELECT * FROM pedido WHERE idCompra = ?", [id]);
                if (respuesta.length > 0) {
                    console.log(respuesta);
                    res.json(respuesta);
                    return;
                }
            }
            catch (error) {
                console.log(error);
            }
            res.json(false);
        });
    }
}
exports.pedidoController = new PedidoController();

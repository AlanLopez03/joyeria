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
exports.compraController = void 0;
const database_1 = __importDefault(require("../database"));
class CompraController {
    Ventas(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fechaInicio } = req.body;
            const { fechaFin } = req.body;
            var respuesta;
            if (fechaInicio == null || fechaFin == null) {
                respuesta = yield database_1.default.query('SELECT * FROM compra');
                if (respuesta.length > 0)
                    res.json(respuesta);
                else
                    res.json(false);
            }
            else {
                try {
                    respuesta = yield database_1.default.query('SELECT * FROM compra where fecha between ? AND ?', [fechaInicio, fechaFin]);
                }
                catch (e) {
                    res.json(false);
                }
                if (respuesta.length > 0)
                    res.json(respuesta);
                else
                    res.json(false);
            }
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM compra WHERE idCompra = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.json(false);
        });
    }
    crearCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params; //id del cliente
                const { fecha } = req.body;
                const { idEdo } = req.body;
                const productosVendidos = yield database_1.default.query("SELECT ca.idProducto, ca.cantidad FROM carrito ca WHERE ca.idCliente = ?", [id]); //productos que se van a comprar
                const busca = yield database_1.default.query("SELECT SUM(ca.cantidad * pro.precio * (pro.descuento)) AS total FROM carrito ca JOIN producto pro ON pro.idProducto = ca.idProducto WHERE ca.idCliente = ?", [id]); //total de la compra
                const total = busca[0].total;
                const compraData = {
                    fecha: req.body.fecha,
                    monto: total,
                    idEdo: req.body.idEdo,
                    idCliente: id,
                    idDomicilio: req.body.idDomicilio
                };
                const respuesta = yield database_1.default.query("INSERT INTO compra set ? ", [compraData]);
                const idCompra = respuesta.insertId;
                try {
                    for (const producto of productosVendidos) {
                        var precio = yield database_1.default.query("SELECT precio,descuento from producto where idProducto = ?", [producto.idProducto]);
                        let aux = precio[0].precio * precio[0].descuento;
                        yield database_1.default.query("INSERT INTO pedido (cantidadProducto,subtotal,idCompra,idProducto) values(?,?,?,?) ", [producto.cantidad, producto.cantidad * aux, idCompra, producto.idProducto]);
                    }
                }
                catch (e) {
                    console.log("error", e);
                }
                const limpiaCarrito = yield database_1.default.query("DELETE FROM carrito WHERE idCliente = ?", [id]);
                res.json(respuesta);
            }
            catch (e) {
                res.json(false);
            }
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM compra');
            res.json(respuesta);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query("UPDATE compra set ? WHERE idCompra = ?", [req.body, id]);
            res.json(resp);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query("DELETE FROM compra WHERE idCompra =?", [id]);
            res.json(resp);
        });
    }
    modificarEstadoCompra(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { estado } = req.body;
            const resp = yield database_1.default.query("UPDATE compra set idEdo = ? WHERE idCompra = ?", [estado, id]);
            res.json(resp);
        });
    }
    verMasVendidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fechaInicio } = req.body;
            const { fechaFin } = req.body;
            if (fechaInicio == null || fechaFin == null) {
                const respuesta = yield database_1.default.query("SELECT idProducto,SUM(cantidadProducto) AS totalVendido FROM pedido GROUP BY idProducto ORDER BY totalVendido ASC LIMIT 10");
                if (respuesta.length > 0) {
                    res.json(respuesta);
                    return;
                }
                res.status(404).json({ 'mensaje': 'No hay productos' });
            }
            else {
                const respuesta = yield database_1.default.query("SELECT pe.idProducto,SUM(pe.cantidadProducto) AS totalVendido FROM pedido pe join compra co on co.idCompra=pe.idCompra where co.fecha between ? AND ? GROUP BY idProducto ORDER BY totalVendido ASC LIMIT 10", [fechaInicio, fechaFin]);
                if (respuesta.length > 0) {
                    res.json(respuesta);
                    return;
                }
                res.status(404).json({ 'mensaje': 'No hay productos' });
            }
        });
    }
    verMenosVendidos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fechaInicio } = req.body;
            const { fechaFin } = req.body;
            if (fechaInicio == null || fechaFin == null) {
                const respuesta = yield database_1.default.query("SELECT idProducto,SUM(cantidadProducto) AS totalVendido FROM pedido GROUP BY idProducto ORDER BY totalVendido desc LIMIT 10");
                if (respuesta.length > 0) {
                    res.json(respuesta);
                    return;
                }
                res.status(404).json({ 'mensaje': 'No hay productos' });
            }
            else {
                const respuesta = yield database_1.default.query("SELECT pe.idProducto,SUM(pe.cantidadProducto) AS totalVendido FROM pedido pe join compra co on co.idCompra=pe.idCompra where co.fecha between ? AND ? GROUP BY idProducto ORDER BY totalVendido desc LIMIT 10", [fechaInicio, fechaFin]);
                if (respuesta.length > 0) {
                    res.json(respuesta);
                    return;
                }
                res.status(404).json({ 'mensaje': 'No hay productos' });
            }
        });
    }
    buscarComprasUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query("SELECT * FROM compra WHERE idCliente = ?", [id]);
            if (respuesta.length > 0) {
                res.json(respuesta);
                return;
            }
            res.json(false);
        });
    }
}
exports.compraController = new CompraController();

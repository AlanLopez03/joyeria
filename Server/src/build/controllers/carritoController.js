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
exports.carritoController = void 0;
const database_1 = __importDefault(require("../database"));
class CarritoController {
    //Ya existe en productoController
    //public async buscar(req: Request, res: Response ): Promise<void>
    //{
    //    const {nombreProducto} = req.body;
    //    try
    //    {
    //        //Se supone recibe el nombre del producto y busca en la base de datos si existe
    //        const respuesta = await pool.query('SELECT * FROM producto WHERE nombre = ?',[nombreProducto]);
    //        if(respuesta.length>0)
    //        {
    //            res.json(respuesta[0]);
    //            return ;
    //        }
    //        res.json(false);
    //    }
    //    catch
    //    {
    //        res.json(false);
    //    }
    //}
    insertarProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idProducto } = req.body;
            const { idCliente } = req.body;
            const { cantidad } = req.body;
            console.log(idCliente);
            console.log(idProducto);
            console.log(cantidad);
            const buscar = yield database_1.default.query('SELECT * FROM carrito WHERE idProducto = ? AND idCliente = ?', [idProducto, idCliente]);
            if (buscar.length > 0) {
                const inventario = yield database_1.default.query("UPDATE producto pro join carrito ca on pro.idProducto=ca.idProducto set pro.stock=pro.stock-? WHERE ca.idCliente = ? AND pro.stock >= ?", [cantidad, idCliente, cantidad]);
                const respuesta = yield database_1.default.query('UPDATE carrito SET cantidad =cantidad+ ? WHERE idProducto = ? AND idCliente = ?', [cantidad, idProducto, idCliente]);
                res.json(respuesta);
                return;
            }
            else {
                const respuesta = yield database_1.default.query('INSERT INTO carrito (idProducto,idCliente,cantidad) VALUES (?,?,?)', [idProducto, idCliente, cantidad]);
                const inventario = yield database_1.default.query("UPDATE producto pro join carrito ca on pro.idProducto=ca.idProducto set pro.stock=pro.stock-ca.cantidad WHERE ca.idCliente = ?", [idCliente]);
                res.json(respuesta);
                return;
            }
        });
    }
    verCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const respuesta = yield database_1.default.query("SELECT pro.idProducto,pro.nombre,pro.name,ca.cantidad,pro.precio,pro.stock,pro.descuento,pro.foto FROM carrito ca join producto pro on pro.idProducto=ca.idProducto   WHERE ca.idCliente = ?", [id]);
                if (respuesta.length > 0) {
                    const carritoConSubtotales = respuesta.map((item) => {
                        const subtotal = item.cantidad * item.precio * item.descuento;
                        return Object.assign(Object.assign({}, item), { subtotal });
                    });
                    res.json(carritoConSubtotales);
                }
                else
                    res.json(false);
            }
            catch (_a) {
                res.json(false);
            }
        });
    }
    listarCompras(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM carrito WHERE idCliente = ?', [id]);
            res.json(respuesta);
        });
    }
    limpiarCarrito(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('DELETE FROM carrito WHERE idCliente = ?', [id]);
            res.json(respuesta);
        });
    }
    eliminarProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('DELETE FROM carrito WHERE idProducto = ?', [id]);
            res.json(respuesta);
        });
    }
}
exports.carritoController = new CarritoController();

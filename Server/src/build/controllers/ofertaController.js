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
exports.ofertaController = void 0;
const database_1 = __importDefault(require("../database"));
class OfertaController {
    creat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO usuarios set ?", [req.body]);
            res.json(resp);
        });
    }
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM ofertalaboral');
            res.json(respuesta);
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM ofertalaboral WHERE idOferta = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'oferta laboral no encontrada' });
            console.log("xd");
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO ofertalaboral set ?", [req.body]);
            res.json(resp);
            //console.log(resp)//de aqui sale el id
        });
    }
    create1(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idEmpresa = req.body.id_empresa;
            const resp = yield database_1.default.query("INSERT INTO ofertalaboral set ?", [req.body]);
            //Ya funciona
            const idOferta = resp.insertId;
            const values = { "idEmpresa": idEmpresa, "idOferta": idOferta }; //Ahorita si lo hace pero con una empresa dada por el admin
            const nuevo = yield database_1.default.query("INSERT INTO ofertaempresa set ?", [values]);
            res.json(nuevo);
            console.log(nuevo); //de aqui sale el id
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.params);
            //console.log(id)
            const resp = yield database_1.default.query("UPDATE ofertalaboral set ? WHERE idOferta = ?", [req.body, id]);
            res.json(resp);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query("DELETE FROM ofertalaboral WHERE idOferta = ?", [id]);
            res.json(resp);
        });
    }
}
exports.ofertaController = new OfertaController();
//obtener el id de insertId

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
exports.marcaController = void 0;
const database_1 = __importDefault(require("../database"));
class MarcaController {
    list(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const respuesta = yield database_1.default.query('SELECT * FROM marca');
                res.json(respuesta);
            }
            catch (error) {
                res.json(false);
            }
        });
    }
    listOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const respuesta = yield database_1.default.query('SELECT * FROM marca WHERE idMarca = ?', [id]);
                if (respuesta.length > 0) {
                    res.json(respuesta[0]);
                    return;
                }
            }
            catch (error) {
                res.json(false);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO marca set ?", [req.body]);
            res.json(resp);
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.params);
            //console.log(id)
            const resp = yield database_1.default.query("UPDATE marca set ? WHERE idMarca = ?", [req.body, id]);
            res.json(resp);
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query("DELETE FROM marca WHERE idMarca =?", [id]);
            res.json(resp);
        });
    }
}
exports.marcaController = new MarcaController();

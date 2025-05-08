"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor() {
        dotenv_1.default.config();
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.use(express_1.default.json({ limit: '50mb' }));
        this.app.use(express_1.default.urlencoded({ limit: '50mb', parameterLimit: 100000, extended: false }));
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'img')));
        this.app.set('port', process.env.PORT || 3002);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
    }
    routes() {
        this.app.post('/uploadImagen', (req, res) => {
            const file = req.body.src;
            const name = req.body.nombre;
            const id = req.body.id;
            const filePath = path_1.default.join(__dirname, 'img', name, id + '.jpg');
            console.log("path=", filePath);
            const binaryData = Buffer.from(file.replace(/^data:image\/[a-z]+;base64,/, ""), 'base64').toString('binary'); //Ya guarda por carpetas/pero la carpeta forzosamente debe existir
            fs_1.default.writeFile(filePath, binaryData, "binary", (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error al guardar la imagen');
                }
                else {
                    console.log('Imagen guardada:', filePath);
                    res.json(true);
                }
            });
        });
    }
    ;
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Listening on port ${this.app.get('port')}`);
        });
    }
}
const server = new Server();
server.start();

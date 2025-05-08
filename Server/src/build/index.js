"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const usuariosRoutes_1 = __importDefault(require("./routes/usuariosRoutes"));
//import empresasRoutes from './routes/empresasRoutes';
const resenaRoutes_1 = __importDefault(require("./routes/resenaRoutes"));
const domicilioRoutes_1 = __importDefault(require("./routes/domicilioRoutes"));
const productoRoutes_1 = __importDefault(require("./routes/productoRoutes"));
const marcaRoutes_1 = __importDefault(require("./routes/marcaRoutes"));
const categoriaRoutes_1 = __importDefault(require("./routes/categoriaRoutes"));
const materialRoutes_1 = __importDefault(require("./routes/materialRoutes"));
const estadoCompraRoutes_1 = __importDefault(require("./routes/estadoCompraRoutes"));
const compraRoutes_1 = __importDefault(require("./routes/compraRoutes"));
const pedidoRoutes_1 = __importDefault(require("./routes/pedidoRoutes"));
const carritoRoutes_1 = __importDefault(require("./routes/carritoRoutes"));
//import ofertaRoutes from './routes/ofertaRoutes';
const rolesRoutes_1 = __importDefault(require("./routes/rolesRoutes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("./swagger.json"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
        this.app.use('/documentacion/', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default)); //documentacion
        //this.app.use(cors({origin: 'https://buena--ephemeral-youtiao-d28fc8.netlify.app'}));
    }
    config() {
        this.app.set('port', process.env.PORT || 3000); //anteriormente 80
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/usuarios/', usuariosRoutes_1.default);
        this.app.use('/api/resenas', resenaRoutes_1.default);
        this.app.use('/api/roles', rolesRoutes_1.default);
        this.app.use('/api/domicilios', domicilioRoutes_1.default);
        this.app.use('/api/productos', productoRoutes_1.default);
        this.app.use('/api/marcas', marcaRoutes_1.default);
        this.app.use('/api/categorias', categoriaRoutes_1.default);
        this.app.use('/api/materiales', materialRoutes_1.default);
        this.app.use('/api/estadosCompra', estadoCompraRoutes_1.default);
        this.app.use('/api/compras', compraRoutes_1.default);
        this.app.use('/api/pedidos', pedidoRoutes_1.default);
        this.app.use('/api/carrito', carritoRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();

import express, {Application} from 'express';
import indexRoutes from './routes/indexRoutes';
import morgan from 'morgan';
import cors from 'cors';
import usuariosRoutes from './routes/usuariosRoutes';
//import empresasRoutes from './routes/empresasRoutes';
import resenasRoutes from './routes/resenaRoutes';
import domicilioRoutes from './routes/domicilioRoutes';
import productoRoutes from './routes/productoRoutes';
import marcaRoutes from './routes/marcaRoutes';
import categoriaRoutes from './routes/categoriaRoutes';
import materialRoutes from './routes/materialRoutes';
import estadoCompraRoutes from './routes/estadoCompraRoutes';
import compraRoutes from './routes/compraRoutes';
import pedidoRoutes from './routes/pedidoRoutes';
import carritoRoutes from './routes/carritoRoutes';
//import ofertaRoutes from './routes/ofertaRoutes';
import rolesRoutes from './routes/rolesRoutes';
import swagger_ui_express from 'swagger-ui-express';
import swaggerDocument from './swagger.json';

class Server
{
public app: Application;
constructor()
{
this.app= express();
this.config();
this.routes();
this.app.use('/documentacion/',swagger_ui_express.serve, swagger_ui_express.setup(swaggerDocument));//documentacion
//this.app.use(cors({origin: 'https://buena--ephemeral-youtiao-d28fc8.netlify.app'}));
}
config (): void
{
this.app.set('port',process.env.PORT|| 3000);//anteriormente 80
this.app.use(morgan('dev'));
this.app.use(cors());
this.app.use(express.json());
this.app.use(express.urlencoded({extended: false}));

}
routes (): void
{
    this.app.use(indexRoutes);
    this.app.use('/api/usuarios/',usuariosRoutes);
    this.app.use('/api/resenas',resenasRoutes);
    this.app.use('/api/roles',rolesRoutes);
    this.app.use('/api/domicilios',domicilioRoutes);
    this.app.use('/api/productos',productoRoutes);
    this.app.use('/api/marcas',marcaRoutes);
    this.app.use('/api/categorias',categoriaRoutes);
    this.app.use('/api/materiales',materialRoutes);
    this.app.use('/api/estadosCompra',estadoCompraRoutes);
    this.app.use('/api/compras',compraRoutes);
    this.app.use('/api/pedidos',pedidoRoutes);
    this.app.use('/api/carrito',carritoRoutes);
    
}
start (): void
{
this.app.listen(this.app.get('port'), () =>
{
console.log('Server on port',this.app.get('port'));
});
}
}
const server = new Server();
server.start();
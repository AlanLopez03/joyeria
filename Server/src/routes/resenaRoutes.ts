import { Router } from 'express';
import { resenaController } from '../controllers/resenaController';

class ResenaRoutes{
    public router: Router=Router();
    constructor(){
        this.config();
    }
    
    config() : void{
        //Ya funciona el crud
        this.router.get('/verResenas', resenaController.list );
        this.router.get('/verResena/:id', resenaController.listOne );
        this.router.post('/crearResena', resenaController.create);
        this.router.put('/actualizarResena/:id',resenaController.update);//ya funciona
        this.router.delete('/eliminarResena/:id',resenaController.delete);

        }
}
const usuariosRoutes= new ResenaRoutes();
export default usuariosRoutes.router;
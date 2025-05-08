import { Router } from 'express';
import { marcaController } from '../controllers/marcaController';

class MarcaRoutes{
    public router: Router=Router();
    constructor(){
        this.config();
    }
    
    config() : void{
        //Ya funciona el crud
        this.router.post('/crearMarca', marcaController.create);
        this.router.put('/actualizar/:id',marcaController.update);//ya funciona
        this.router.delete('/eliminar/:id',marcaController.delete);
        this.router.get('/', marcaController.list );
        this.router.get('/:id', marcaController.listOne );
        }
}
const marcaRoutes= new MarcaRoutes();
export default marcaRoutes.router;
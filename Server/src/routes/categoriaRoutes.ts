import { Router } from 'express';
import { categoriaController } from '../controllers/categoriaController';

class CategoriaRoutes{
    public router: Router=Router();
    constructor(){
        this.config();
    }
    
    config() : void{
        //Ya funciona el crud
        this.router.post('/crearCategoria', categoriaController.create);
        this.router.put('/actualizar/:id',categoriaController.update);//ya funciona
        this.router.delete('/eliminar/:id',categoriaController.delete);
        this.router.get('/', categoriaController.list );
        this.router.get('/:id', categoriaController.listOne );
        }
}
const categoriaRoutes= new CategoriaRoutes();
export default categoriaRoutes.router;
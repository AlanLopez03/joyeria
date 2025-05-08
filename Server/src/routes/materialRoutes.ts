import { Router } from 'express';
import { materialController } from '../controllers/materialController';

class MaterialRoutes{
    public router: Router=Router();
    constructor(){
        this.config();
    }
    
    config() : void{
        //Ya funciona el crud
        this.router.post('/crearMaterial', materialController.create);
        this.router.put('/actualizar/:id',materialController.update);//ya funciona
        this.router.delete('/eliminar/:id',materialController.delete);
        this.router.get('/', materialController.list );
        this.router.get('/:id', materialController.listOne );
        }
}
const materialRoutes= new MaterialRoutes();
export default materialRoutes.router;
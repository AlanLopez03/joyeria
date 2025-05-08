import { Router } from 'express';
import { rolesController } from '../controllers/rolesController';

class RolesRoutes{
    public router: Router=Router();
    constructor(){
        this.config();
    }
    
    config() : void{
        //Ya funciona el crud
        this.router.post('/crearRol', rolesController.create);
        this.router.put('/actualizar/:id',rolesController.update);//ya funciona
        this.router.delete('/eliminar/:id',rolesController.delete);
        this.router.get('/', rolesController.list );
        this.router.get('/:id', rolesController.listOne );
        }
}
const rolesRoutes= new RolesRoutes();
export default rolesRoutes.router;
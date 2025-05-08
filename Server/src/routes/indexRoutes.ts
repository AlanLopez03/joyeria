import { Router } from 'express';
//import { empresasController } from '../controllers/empresasController';
class IndexRoutes
{
public router: Router=Router();
constructor()
{
this.config();
}
config() : void
{
this.router.get('/pelon',(req,res) => res.send('probando ruta'));
//this.router.get('/create/',empresasController.create)
}
}
const indexRoutes= new IndexRoutes();
export default indexRoutes.router;



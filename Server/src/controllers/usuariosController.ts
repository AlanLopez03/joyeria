import e, {Request,Response} from 'express';
import bcrypt from 'bcryptjs';
import pool from '../database';

class UsuariosController
{
    public async login(req: Request, res: Response ): Promise<void>
    {
        const {correo, password} = req.params;
        //Se supone que son correos unicos
        const respuesta = await pool.query('SELECT * FROM usuarios WHERE correo = ? ',[correo]);
        if(respuesta.length>0)
        //Compara la contraseña ingresada con la contraseña encriptada en la base de datos y devuelve un booleano
            if (await bcrypt.compare(password, respuesta[0].password))
            {
            res.json(respuesta[0]);
            return ;
            }
        //El usuario no existe o la contraseña es incorrecta
        res.json(false);
    }
    
    public async list(req: Request, res: Response ): Promise<void>
    {
        try
        {
        const respuesta = await pool.query('SELECT * from usuarios');
        res.json( respuesta );
        }
        catch
        {
            res.json(false);
        }
    }

    public async listOne(req: Request, res: Response): Promise <void>
    {
        const {id} = req.params;
        const respuesta = await pool.query('SELECT * FROM usuarios WHERE idUsuario = ?', [id]);
        if(respuesta.length>0)
        {
            res.json(respuesta[0]);
            return ;
        }
        res.json(false);
    }

    public async create(req: Request, res: Response): Promise<void> {
    
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    try{
    const resp = await pool.query("INSERT INTO usuarios set ?",[req.body]);
    res.json(resp);
    }
    catch(error)
    {
        res.json(error);
    }
    }

    public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    console.log(req.params);
    //console.log(id)
    const resp = await pool.query("UPDATE usuarios set ? WHERE idUsuario = ?", [req.body, id]);
    res.json(resp);
    }

    public async delete(req: Request, res: Response): Promise<void> 
    {
    const { id } = req.params;
    const resp = await pool.query("DELETE FROM usuarios WHERE idUsuario =?",[id]);
    res.json(resp);
    }
    public async verPedidos(req: Request, res: Response ): Promise<void>
        {
            const {id} = req.params;
            try
            {
                const respuesta = await pool.query("SELECT pe.idPedido,pro.idProducto,pe.cantidadProducto,pe.subtotal FROM pedido pe JOIN compra co on pe.idCompra=co.idCompra join producto pro on pro.idProducto= pe.idProducto join usuarios usr ON usr.idUsuario=co.idCliente WHERE usr.idUsuario=?",[id]);
                if(respuesta.length>0)
                    res.json(respuesta);
                else
                    res.json(false);      
            }
            catch(error)
            {
                res.json(error);
            }   
        }

    public async rastrearPedidos(req: Request, res: Response ): Promise<void>
    {
        const {id} = req.params;
        console.log(id);
        const respuesta = await pool.query("SELECT pe.idPedido,pro.idProducto,pe.cantidadProducto,pe.subtotal FROM pedido pe JOIN compra co on pe.idCompra=co.idCompra join producto pro on pro.idProducto= pe.idProducto join usuarios usr ON usr.idUsuario=co.idCliente WHERE pe.idPedido=?",[id]);
        if(respuesta.length>0 && respuesta[0].idPedido==id)
            {
            res.json(respuesta[0]);
            return ;
            }
            res.status(404).json({'mensaje': 'Este pedido no existe'});
    }
    //No se si lo vamos a usar
    public async recomendaciones(req: Request, res: Response ): Promise<void>{

        const {id} = req.params;
        const respuesta = await pool.query("SELECT pro.idProducto, SUM(pe.cantidadProducto) AS totalComprado FROM producto pro JOIN pedido pe ON pe.idProducto = pro.idProducto JOIN compra co ON co.idCompra = pe.idCompra WHERE co.idCliente = ? GROUP BY pro.idProducto ORDER BY totalComprado DESC LIMIT 5",[id]);
        if(respuesta.length>0)
        {
            res.json(respuesta);
            return ;
        }
        else{
            //console.log("entro");
            const respuesta= await pool.query("SELECT * FROM producto ORDER BY RAND() LIMIT 5");
            res.json(respuesta);
            return ;
        }

    }
    
    public async buscarUsuarioporAtributo(req: Request, res: Response ): Promise<void>{
        const {valor} = req.body;
        const respuesta = await pool.query("SELECT * FROM usuarios WHERE nombre like"+"'%"+valor+"%'");
        if (respuesta.length>0){
            res.json(respuesta);
            return ;
        }
        res.json(false);
    }

    public async existeCorreo(req: Request, res: Response):Promise<void>{
        const {correo} = req.body;
        const resp = await pool.query("SELECT * FROM usuarios WHERE correo = ?",correo);
        if (resp.length>0){
            res.json(resp);
            return;
        }
        res.json(null);
    }

    public async actualizarPassword(req: Request, res: Response): Promise<void> {
        const {token} = req.params;
        //Destokenizamos
        const decoded = decodeJWT(token);
        console.log(decoded);
    
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt)
        const resp = await pool.query("UPDATE usuarios set ? WHERE correo = ?", [req.body, decoded]);
        res.json(resp);
    }
    public async updateFoto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(id);
        const resp = await pool.query("UPDATE usuarios set foto = 1 WHERE idUsuario = ?", id);
        console.log("Despues del update de foto");
        res.json(resp);
    }



}

function decodeJWT(token:any) {
    return (Buffer.from(token.split('.')[1], 'base64').toString());
}

export const usuariosController = new UsuariosController();
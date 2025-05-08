import {Request,Response} from 'express';
import pool from '../database';

class PedidoController{
    public async list(req: Request, res: Response ): Promise<void>{
        const respuesta = await pool.query('SELECT * FROM pedido');
        if (respuesta.length>0)
        {
            res.json(respuesta);
            return;
        }
        res.json( false );
    }
    public async gestionarPedidos(req: Request, res: Response ): Promise<void>{
        try
        {  
        const respuesta = await pool.query('SELECT * FROM pedido join compra on compra.idCompra=pedido.idPedido where idEdo!=1');
        if(respuesta.length>0){
            res.json(respuesta);
            return ;
            }}
        catch (error)
        {
            res.json(false);
        }
       
    }

    public async listOne(req: Request, res: Response): Promise <void>{
    const {id} = req.params;
    try{
        const respuesta = await pool.query('SELECT * FROM pedido WHERE idPedido = ?', [id]);
        if(respuesta.length>0)
        {
            res.json(respuesta[0]);
            return ;
        }
        res.json(false);
        }
        catch (error)
        {
            res.json(false);
        }
    }

    public async create(req: Request, res: Response): Promise<void> {
    const resp = await pool.query("INSERT INTO pedido set ?",[req.body]);
    res.json(resp);
    }

    public async update(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    console.log(req.params);
    //console.log(id)
    const resp = await pool.query("UPDATE pedido set ? WHERE idPedido = ?", [req.body, id]);
    res.json(resp);
    }

    public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const resp = await pool.query("DELETE FROM pedido WHERE idPedido =?",[id]);
    res.json(resp);
    }
    public async modificarEstadoPedido(req: Request, res: Response ): Promise<void>
    {
        const {id} = req.params;
        const {estado}=req.body;//Se tiene que llamar igual que en la peticion de insomnia
        console.log(id);
        console.log(estado);
        const respuesta = await pool.query("UPDATE pedido set estado=? WHERE idPedido = ?", [estado, id]);
        //console.log(respuesta);
        res.json(respuesta);
        return;
        //res.status(404).json({'mensaje': 'El pedido no existe o el estado es nulo'});
    
    }
    public async verPedidos(req: Request, res: Response ): Promise<void>
    {
        
        const {id} = req.params;
        try{
            const respuesta = await pool.query("SELECT * FROM pedido WHERE idCompra = ?", [id]);
            if(respuesta.length>0){
                console.log(respuesta);
                res.json(respuesta);
                return ;
            }

        }
        catch (error)
        {
            console.log(error);
        }
        res.json(false);

    }
}

export const pedidoController = new PedidoController();
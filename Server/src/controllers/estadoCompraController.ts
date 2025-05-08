import {Request,Response} from 'express';
import pool from '../database';

class EstadoCompraController{
public async list(req: Request, res: Response ): Promise<void>{
    const respuesta = await pool.query('SELECT * FROM estadocompra');
    res.json( respuesta );
}

public async listOne(req: Request, res: Response): Promise <void>{
const {id} = req.params;
const respuesta = await pool.query('SELECT * FROM estadocompra WHERE idEstado = ?', [id]);
if(respuesta.length>0){
res.json(respuesta[0]);
return ;
}
res.status(404).json({'mensaje': 'Este estado no fue  encontrado'});
}

public async create(req: Request, res: Response): Promise<void> {
const resp = await pool.query("INSERT INTO estadocompra set ?",[req.body]);
res.json(resp);
}

public async update(req: Request, res: Response): Promise<void> {
const { id } = req.params;
console.log(req.params);
//console.log(id)
const resp = await pool.query("UPDATE estadocompra set ? WHERE idEstado = ?", [req.body, id]);
res.json(resp);
}

public async delete(req: Request, res: Response): Promise<void> {
const { id } = req.params;
const resp = await pool.query("DELETE FROM estadocompra WHERE idEstado =?",[id]);
res.json(resp);
}
}

export const estadocompraController = new EstadoCompraController();
import {Request,Response} from 'express';
import pool from '../database';

class MarcaController{
public async list(req: Request, res: Response ): Promise<void>{
    try{
    const respuesta = await pool.query('SELECT * FROM marca');
    res.json( respuesta );}
    catch(error){
        res.json(false)
    }
}

public async listOne(req: Request, res: Response): Promise <void>{
    try{
    const {id} = req.params;

    const respuesta = await pool.query('SELECT * FROM marca WHERE idMarca = ?', [id]);
    if(respuesta.length>0){
    res.json(respuesta[0]);
    return ;
        }
    }
    catch(error){
    res.json(false);}
}

public async create(req: Request, res: Response): Promise<void> {
const resp = await pool.query("INSERT INTO marca set ?",[req.body]);
res.json(resp);
}

public async update(req: Request, res: Response): Promise<void> {
const { id } = req.params;
console.log(req.params);
//console.log(id)
const resp = await pool.query("UPDATE marca set ? WHERE idMarca = ?", [req.body, id]);
res.json(resp);
}

public async delete(req: Request, res: Response): Promise<void> {
const { id } = req.params;
const resp = await pool.query("DELETE FROM marca WHERE idMarca =?",[id]);
res.json(resp);
}
}

export const marcaController = new MarcaController();
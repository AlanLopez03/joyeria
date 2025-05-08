import {Request,Response} from 'express';
import pool from '../database';

class RolesController
{
public async list(req: Request, res: Response ): Promise<void>{
    const respuesta = await pool.query('SELECT * FROM roles');
    if (respuesta.length>0)
    {
        res.json(respuesta);
        return;
    }
    res.json( false );
}
public async listOne(req: Request, res: Response): Promise <void>
{
    const {id} = req.params;
    try
    {
        const respuesta = await pool.query('SELECT * FROM roles WHERE idRol = ?', [id]);
        if(respuesta.length>0)
        {
            res.json(respuesta[0]); 
            return ;
        }
    }
    catch(e)
    {
        console.log(e);
        res.json(false);
    }
}

public async create(req: Request, res: Response): Promise<void>
{
    try{
        const resp = await pool.query("INSERT INTO roles set ?",[req.body]);
        res.json(resp);
    }
    catch(e)
    {
        console.log(e);
        res.json(false);

    }
}

public async update(req: Request, res: Response): Promise<void> 
{
    const { id } = req.params;
    console.log(req.params);
    try
    {
    const resp = await pool.query("UPDATE roles set ? WHERE idRol = ?", [req.body, id]);
    res.json(resp);
    }
    catch(e)
    {
        console.log(e);
        res.json(false);
    }
}

public async delete(req: Request, res: Response): Promise<void> 
    {
    const { id } = req.params;
    const resp = await pool.query("DELETE FROM roles WHERE idRol =? ",[id]);
    res.json(resp);
    }
}

export const rolesController = new RolesController();
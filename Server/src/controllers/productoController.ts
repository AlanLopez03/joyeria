import {Request,Response} from 'express';
import pool from '../database';

class ProductoController
{
    public async verOfertas(req: Request, res: Response): Promise<void>{
        try{
        const respuesta = await pool.query('SELECT * FROM producto WHERE descuento<1');
        if (respuesta.length>0)
        {
            res.json(respuesta);
            return;
        }
        res.json( false  );
        }
        catch (err){
            res.json(err);
        }
    }
    public async list(req: Request, res: Response ): Promise<void>
    {
        try{
        const respuesta = await pool.query('SELECT * FROM producto');
        //const respuesta = await pool.query('SELECT idProducto, nombre,name, descripcion,description,stock,precio,descuento,inicio_descuento,fin_descuento,idMaterial,idCategoria,idMarca,foto  FROM producto');
        res.json( respuesta );
        }
        catch{
            res.json(false);
        }
    }
    public async listOne(req: Request, res: Response): Promise <void>
    {
    const {id} = req.params;
    const respuesta = await pool.query('SELECT * FROM producto WHERE idProducto = ?', [id]);
    if(respuesta.length>0)
        {
        res.json(respuesta[0]);
        return ;
        }
    res.json(false);
    }

    public async create(req: Request, res: Response): Promise<void> 
    {
        try{
        const resp = await pool.query("INSERT INTO producto set ?",[req.body]);
        res.json(resp);
        }
        catch{
            res.json(false);
        }
    }

    public async update(req: Request, res: Response): Promise<void>
    {
        const { id } = req.params;
        console.log(req.params);
        //console.log(id)
        const resp = await pool.query("UPDATE producto set ? WHERE idProducto = ?", [req.body, id]);
        res.json(resp);
    }

    public async delete(req: Request, res: Response): Promise<void> 
    {
        try {
            const { id } = req.params;
            const resp4 = await pool.query("UPDATE compra SET monto = monto - ( (SELECT precio FROM producto WHERE idProducto = ?) * (SELECT pedido.cantidadProducto FROM pedido where pedido.idCompra = compra.idCompra and pedido.idProducto= ?)) WHERE idCompra IN (SELECT idCompra FROM pedido WHERE idProducto = ?)", [id, id, id]);
            const resp1 = await pool.query("DELETE compra FROM compra WHERE compra.monto = 0");
            const resp2 = await pool.query("DELETE FROM pedido WHERE pedido.idProducto = ?", [id]);
            const resp3 = await pool.query("DELETE FROM producto WHERE idProducto = ?", [id]);
            const combinedResponse = {
                respuesta2: resp4,
                respuesta3: resp1,
                respuesta4: resp2,
                respuesta5: resp3,
            };
            res.json(combinedResponse);
            
          } catch (error) {
            console.error('Error al ejecutar las consultas:', error);
            res.status(500).json({ error: 'Error al ejecutar las consultas' });
        }
    }

    public async aplicarDescuento(req: Request, res: Response): Promise<void> 
    {
        const { id } = req.params;
        const{descuento}=req.body;
        console.log(descuento);
        try{
            const resp = await pool.query("UPDATE producto set descuento=? WHERE idProducto = ?", [descuento,id]);
            res.json(resp);
            
        }
        catch(err){
            console.log(err);
            res.json(false);
        }

    }
    public async filtrarProductos(req: Request, res: Response): Promise <void>
    {
        const {id} = req.params;
        try
        {
            const respuesta = await pool.query('SELECT * FROM producto WHERE idCategoria = ?', [id]);
            if(respuesta.length>0)
            {
                res.json(respuesta);
                return ;
            }
            res.json(false);
            
        }   
        catch(err){
            console.log(err);
            res.json(false);
        }   
    }   

    public async buscarporNombre(req: Request, res: Response): Promise <void>{
        const {nombre} = req.body;
        const respuesta = await pool.query('SELECT * FROM producto WHERE nombre LIKE ?', [`%${nombre}%`]);
        if(respuesta.length>0){
        res.json(respuesta);
        return ;
        }
        res.json(false);
    }
    public async agregarStock(req: Request, res: Response): Promise <void>{
        const {id} = req.params;
        const {stock}=req.body;
        try{
        const respuesta = await pool.query('UPDATE producto set stock=stock+? WHERE idProducto = ?', [stock,id]);
        res.json(respuesta);
        }
        catch(err){
            console.log(err);
        }
    }
    public async buscarbyCategoria(req: Request, res: Response): Promise <void>{
        const categoria = req.params.id;
        //console.log(categoria);
        try{
            const consulta = await pool.query('SELECT producto.idProducto, producto.nombre, producto.name, producto.descripcion,producto.stock,producto.precio,producto.descuento,producto.foto,DATE(inicio_descuento),Date(fin_descuento),producto.idMaterial,producto.idCategoria,producto.idMarca FROM producto where producto.idCategoria = ?', [categoria]);
            res.json(consulta);
        }
        catch(err){
            console.log(err);
        }
    }

    public async buscar_producto(req: Request, res: Response): Promise <void>
    {
        const {nombre} = req.params;
        const {idioma} = req.params;
        console.log ("Buscar: ", nombre);
        let respuesta = '';
        if (idioma == '2')
            respuesta = await pool.query('SELECT idProducto, nombre,name, descripcion,stock,precio,descuento,DATE(inicio_descuento),Date(fin_descuento),idMaterial,idCategoria,idMarca,foto FROM producto WHERE nombre LIKE ?', [`${nombre}%`]);
        if (idioma == '1')
            respuesta = await pool.query('SELECT idProducto, nombre,name, descripcion,stock,precio,descuento,DATE(inicio_descuento),Date(fin_descuento),idMaterial,idCategoria,idMarca,foto FROM producto WHERE name LIKE ?', [`${nombre}%`]);
        //const respuesta = await pool.query('SELECT idProducto, nombre,name, descripcion,stock,precio,descuento,DATE(inicio_descuento),Date(fin_descuento),idMaterial,idCategoria,idMarca,foto FROM producto WHERE nombre LIKE ?', [`${nombre}%`]);

        if(respuesta.length>0)
        {
            res.json(respuesta);
        }
        else
        {
            res.json({"id_producto":"-1"});
        }
    
    }
    public async updateFoto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        console.log(id);
        const resp = await pool.query("UPDATE producto set foto = 1 WHERE idProducto = ?", id);
        console.log("Despues del update de foto");
        res.json(resp);
    }


}

export const productoController = new ProductoController();
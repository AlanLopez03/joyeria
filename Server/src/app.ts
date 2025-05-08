import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from "./database";

const correoAcceso = require('./correoAcceso');
const correoOfertas = require ('./correoOfertas');


class Server
{
    public app: Application;
    constructor()
    {
        dotenv.config();
        this.app = express();
        this.config();
        this.routes();
    }
    config(): void {
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ limit: '50mb', parameterLimit: 100000, extended: false }));
        this.app.set('port', process.env.PORT || 3001);
        this.app.use(morgan('dev'));
        this.app.use(cors());
    }
    
    routes(): void
    {
        this.app.post('/enviarCorreoRecuperarContrasenya', (req) =>
        {
            console.log("app req.body: " + req.body.correo);
            correoAcceso(req.body);
        });

        this.app.post('/enviarCorreoOferta', (req) =>
            {
                //console.log("Checando que le llega" ,req);
                const { productos, correo } = req.body;
                //console.log ("Productoooooooooooooos",productos);
                correoOfertas(productos, correo);
            });

        this.app.post('/decodificarMail', async (req, res) =>
        {
            let decodificado;
            try
            {
                decodificado = jwt.verify(req.body.token, process.env.TOKEN_SECRET || 'prueba');
                const result1 = await this.queryProfesor(decodificado) as any;
                if(result1.length==0)
                res.json(0);
                else
                res.json( result1[0] );
            }
            catch(err) { res.json( 0 ); }
        });
    }
    queryProfesor = (decodificado:any) =>
    {
        return new Promise((resolve, reject)=>
        {
            let consulta='SELECT * FROM profesores WHERE correo="'+decodificado+'"';
            pool.query(consulta, (error:any, results:any)=>
            {
                if(error)
                    return reject(error);
                return resolve(results);
            });
        });
    };
    start()
    {
        this.app.listen(this.app.get('port'), () =>
        {
            console.log(`Listening on port ${this.app.get('port')}`);
        });
    }
}

const server = new Server();
server.start();
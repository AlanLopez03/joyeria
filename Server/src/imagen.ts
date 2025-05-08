import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import pool from "./database";
import fs from 'fs';

import path from 'path';


class Server {
    public app: Application;
    constructor() {
        dotenv.config();
        this.app = express();
        this.config();
        this.routes();
    }
    config(): void {
        this.app.use(express.json({ limit: '50mb' }));
        this.app.use(express.urlencoded({ limit: '50mb', parameterLimit: 100000, extended: false }));
        this.app.use(express.static(path.join(__dirname, 'img')));
        this.app.set('port', process.env.PORT || 3002);
        this.app.use(morgan('dev'));
        this.app.use(cors());
    }

    routes(): void {
        this.app.post('/uploadImagen', (req, res) => {
            const file = req.body.src;
            const name = req.body.nombre;
            const id = req.body.id;
            const filePath = path.join(__dirname, 'img', name, id + '.jpg');
            console.log("path=",filePath);
            const binaryData =
                Buffer.from(file.replace(/^data:image\/[a-z]+;base64,/, ""),'base64').toString('binary');//Ya guarda por carpetas/pero la carpeta forzosamente debe existir
            fs.writeFile(filePath, binaryData,"binary", (err) => 
                {                
                if (err) {
                    console.log(err);
                    res.status(500).send('Error al guardar la imagen');
                } else {
                    console.log('Imagen guardada:', filePath);
                    res.json(true);
                }
                } 
            );
        });


    };

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Listening on port ${this.app.get('port')}`);
        });
    }
}

const server = new Server();
server.start();
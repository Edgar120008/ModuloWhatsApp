import express from 'express';
import cors from 'cors';
import * as server from 'http'
import * as io from 'socket.io';
import { socketController } from '../controllers/socket-user.controller.js'
import { generateClient, newMessage } from '../controllers/whatsapp-web.controller.js';
// const express = require('express');
// const cors = require('cors');

export class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT | 80
        this.server = server.createServer(this.app).listen(this.port);
        this.io = new io.Server(this.server)
        this.paths = {}

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Directorio Público
        this.app.use(express.static('public'));

    }

    routes() {}

    sockets() {

        // this.io.on('connection', socketController)
        this.io.on('connection', (socket) => {
            socket.on('eventoLotgin', (args) => generateClient(args, socket));
            socket.on('mensaje-enviado', (args) => newMessage(args, socket));
        })
    }

    listen() {
        this.sockets();
        console.log(`Socket a la espera de conexiones ${this.port}`);
        // this.server.listen(this.port, () => {
        //     console.log('Se srvidor corriendo en puerto', this.port);
        // });
        // this.io = new Server(this.port);
    }

}
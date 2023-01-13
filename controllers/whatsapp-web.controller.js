import qrcode from 'qrcode-terminal';
import { Client } from 'whatsapp-web.js';


const client = new Client();

export const generateClient = async(socket) => {

    // console.log('in client generator')
    client.on('qr', qr => {
        qrcode.generate(qr, { small: true });
        // console.log(qr)
        // console.log('Qr enviado');
        socket.emit('qr', qr);
    });

    client.on('ready', () => {
        console.log('Client is ready!');
    });

    client.initialize();
}

export const newMessage = async(msg, socket) => {

    console.log('si llego we');

    let { telefono, mensaje } = msg

    let clientNumber = '521' + telefono + '@c.us';

    await client.sendMessage(clientNumber, mensaje)

    let well = {
        mensaje: 'Se mando el mensaje'
    }

    client.emit('mensaje-enviado1', (well));
}
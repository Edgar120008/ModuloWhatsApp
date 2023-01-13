const online = document.querySelector('#online');
const offline = document.querySelector('#offline');
const mensaje = document.querySelector('#mensaje');
const telefono = document.querySelector('#numero-telefonico');
const enviar = document.querySelector('#enviar');
const enviarMensaje = document.querySelector('#mensaje-enviar');


const socket = io();


socket.on('connect', () => {
    console.log('conectado')

    online.style.display = '';
    offline.style.display = 'none';
});

socket.on('disconnect', () => {
    console.log('desconectado')

    online.style.display = 'none';
    offline.style.display = '';
});



// socket.on('enviar-mensaje', (payload) => {
//     console.log(payload);
// })

socket.on('qr', (qr) => {
    console.log('Respuesta de QR');
    console.log(qr)
})

enviar.addEventListener('click', () => {

    socket.emit('eventoLotgin', '');
    console.log('sesion iniciada')
        // const mensaje2 = mensaje.value;

    // let payload = {
    //     mensaje2,
    //     id: socket.id,
    //     fecha: new Date().getTime()
    // }

    // socket.emit('enviar-mensaje', payload, (id) => {
    //     console.log(`desde el server ${id}`)
    // });

});

enviarMensaje.addEventListener('click', () => {

    let msg = {
        mensaje: mensaje.value,
        telefono: telefono.value
    }

    console.log('qwerty');
    socket.emit('mensaje-enviado', msg);

    socket.on('mensaje-enviado1', (well) => {
        console.log('Se mando el mensaje')
        console.log(well)
    })
})
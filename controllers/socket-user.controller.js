export const socketController = (socket) => {
    console.log('cliente conectado', socket.id);

    socket.on('disconnect', () => {
        console.log('cliente desconectado', socket.id);
    });

    socket.on('enviar-mensaje', (payload, callback) => {
        console.log({ payload })
        const id = socket.id
        callback(id)

        socket.broadcast.emit('enviar-mensaje', payload);
    })
}
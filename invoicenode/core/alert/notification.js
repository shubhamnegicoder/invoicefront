import socketIO from 'socket.io';
let io = new socketIO();
io.listen(8081);
export default function(server, notify) {
  io.on('connection', s => {
    console.log('Connected');
    setInterval(() => {
      if (typeof notify === 'object') {
        console.log(notify.udid,'udid');
        s.emit(notify.udid, notify.data);
      }
    }, 3000 + Math.floor(Math.random() * 4000));
    io.on('disconnect', () => {
      console.log('Disconnected');
    });
  });
}

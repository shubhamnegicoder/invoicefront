'use strict';

import { MongoClient } from 'mongodb';
import { DeviceParserUtility } from './deviceParserUtility';
import { DeviceFunctionUtility } from './deviceFunctionUtility';
import { AlertUtility } from './alert/alertUtility';

var url = 'mongodb://localhost:27017/iot_server_app';
var clients = [];

class deviceTrackingHistoryUtility {
  static onClientConnected(socket) {
    console.log(`New client: ${socket.remoteAddress}:${socket.remotePort}`);
    socket.destroy();
  }

  static onClientConnected(socket) {
    socket.name = `${socket.remoteAddress}:${socket.remotePort}`;
    clients.push(socket);
    console.log(`${socket.name} connected.`);
    socket.on('data', data => {
      var m = data.toString().replace(/[\n\r]*$/, '');
      console.log(m,'message');
      var l = this.typeCheck(m);
      DeviceFunctionUtility.address(l, function(result) {
        var l = result;
        if (typeof l === 'object' && typeof l !== 'string') {
          socket.data = { msg: l };
          AlertUtility.tempAlert({ l });
          deviceTrackingHistoryUtility.insertData(socket);
        } else {
          console.log(`${socket.name} : ${l} "check the data"`);
          deviceTrackingHistoryUtility.broadcast(
            socket.name + '> ' + l + ' check the data',
            socket
          );
          socket.write(`${l}. check the data!\n`);
        }
      });
    });

    socket.on('end', () => {
      clients.splice(clients.indexOf(socket), 1);
      console.log(`${socket.name} disconnected.`);
    });
  }

  static typeCheck(str) {
    if (str.length === 116) {
      return DeviceParserUtility.deviceType1(str);
    } else if (str.length === 99) {
      return DeviceParserUtility.deviceType3(str);
    } else {
      return 'data not match';
    }
  }

  static insertData(socket) {
    MongoClient.connect(url, (err, db) => {
      var find = { deviceId: socket.data.msg.deviceId };
      db.collection('deviceTrackerHistory').findOne(find, (err, result) => {
        if (!result) {
          var insert = {
            deviceId: socket.data.msg.deviceId,
            history: [socket.data.msg],
            deviceType: '',
            workingStatus: '',
            status: '',
            createdAt: new Date()
          };
          db
            .collection('deviceTrackerHistory')
            .insert(insert, (err, result) => {
              if (err) {
                console.log(`${socket.name} error message is : ${err}`);
                this.broadcast(socket.name + '> ' + err, socket);
                socket.write(`error message is (${err}). Thanks!\n`);
              } else {
                console.log(
                  `${socket.name} said: ${JSON.stringify(result.ops[0])}`
                );
                this.broadcast(
                  socket.name + '> ' + JSON.stringify(result.ops[0]),
                  socket
                );
                socket.write(
                  `We got message (${JSON.stringify(result.ops[0])}). Thanks!\n`
                );
              }
            });
        } else {
          var update = {
            select: { deviceId: socket.data.msg.deviceId },
            data: { $push: { history: socket.data.msg } }
          };
          db
            .collection('deviceTrackerHistory')
            .findOneAndUpdate(update.select, update.data, (err, result) => {
              if (err) {
                console.log(`${socket.name} error message is : ${err}`);
                this.broadcast(socket.name + '> ' + err, socket);
                socket.write(`error message is (${err}). Thanks!\n`);
              } else {
                var res = JSON.stringify(
                  result.value.history[result.value.history.length - 1]
                );
                console.log(`${socket.name} said: ${res}`);
                this.broadcast(socket.name + '> ' + res, socket);
                socket.write(`We got message (${res}). Thanks!\n`);
              }
            });
        }
      });
    });
  }

  static broadcast(message, sender) {
    clients.forEach(client => {
      if (client === sender) return;
      client.write(message);
    });
    process.stdout.write(message);
  }
}

export default deviceTrackingHistoryUtility;

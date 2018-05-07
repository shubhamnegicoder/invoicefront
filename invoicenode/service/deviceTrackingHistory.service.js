/**
 * @file(DeviceTrackingHistory.service.js) All service realted to DeviceTrackingHistory and entry handler file after routing
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 11-Jan-2018
 * @lastModifedBy Shakshi
 */

import DeviceTrackingHistory from '../models/deviceTrackingHistory.model';
import DeviceTracking from '../models/deviceTracking.model';
import Device from '../models/device.model';
import utility from '../core/utility.js';
import msg from '../core/message/error.msg.js';
import logger from '../core/logger/app.logger';
import deviceTrackingHistoryUtility from '../core/deviceTrackingHistory.utility';

/**
 * [service is a object ]
 * @type {Object}
 */
const service = {};

service.onClientConnected = function(socket) {
  return deviceTrackingHistoryUtility.onClientConnected(socket);
};

service.onClientConnected = function(socket) {
  return deviceTrackingHistoryUtility.onClientConnected(socket);
};

/**
 * @description [with all the calculation before getAll function of model and after getAll]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.getAll = async (req, res) => {
  try {
    var start = new Date();
    start.setHours(0, 0, 0, 0);

    var end = new Date();
    end.setHours(23, 59, 59, 999);
    let isodate = new Date().toISOString().split(/T/);
    //isodate[0]+' 00:00:00', '$lte' : isodate[0]+' 23:59:59'
    //// gaus:8ec160ccbedf6ced chetan : 203d4784826ac3f6 rasmi: 6a82d3d91b48a947
    console.log(isodate, ' - ', start);
    let condition = {
      deviceId: req.query.deviceId,
      date: {
        //'$gte': isodate[0]+' 00:00:00', '$lte' : isodate[0]+' 23:59:59'
        $gte: start,
        $lte: end
      }
    };
    console.log(condition);
    const deviceTrackingHistory = await DeviceTrackingHistory.getAll(condition);
    logger.info('sending all DeviceTrackingHistory...');
    res.send({
      success: true,
      code: 200,
      msg: 'sending all DeviceTrackingHistory',
      data: deviceTrackingHistory
    });
  } catch (err) {
    logger.error('Error in getting DeviceTrackingHistory- ' + err);
    res.send({
      success: false,
      code: 500,
      msg: msg.getDeviceTrackingHistory,
      err: err
    });
  }
};

service.getAllDeviceHistoryLatLng = async (req, res) => {
  console.log(req.query.customerId, 'check');
  try {
    let condition = [
      {
        $match: { customerId: req.query.customerId }
      }
    ];
    const deviceTrackingHistory = await DeviceTrackingHistory.getAggregation(
      condition
    );
    logger.info('sending all DeviceTrackingHistory...', deviceTrackingHistory);
    res.send({
      success: true,
      code: 200,
      msg: 'sending all DeviceTrackingHistory',
      data: deviceTrackingHistory
    });
  } catch (err) {
    logger.error('Error in getting DeviceTrackingHistory- ' + err);
    res.send({
      success: false,
      code: 500,
      msg: msg.getDeviceTrackingHistory,
      err: err
    });
  }
};

service.getAllDeviceRecentLatLng = async (req, res) => {
  console.log(req.query.customerId, 'check');
  try {
    let condition = [
      {
        $match: { customerId: req.query.customerId }
      },
      {
        $project: {
          deviceId: 1,
          recent: { $arrayElemAt: ['$history', -1] },
          deviceType : 1
        }
      }
    ];
    const deviceTrackingHistory = await DeviceTrackingHistory.getAggregation(
      condition
    );
    logger.info('sending all DeviceTrackingHistory...');
    res.send({
      success: true,
      code: 200,
      msg: 'sending all DeviceTrackingRecentLatLng',
      data: deviceTrackingHistory
    });
  } catch (err) {
    logger.error('Error in getting DeviceTrackingHistory- ' + err);
    res.send({
      success: false,
      code: 500,
      msg: 'sending all DeviceTrackingRecentLatLng Faild',
      err: err
    });
  }
};
/**
 * @description [calculation before add DeviceTrackingHistory to db and after adding DeviceTrackingHistory ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addDeviceTrackingHistoryData = async (req, res) => {
  let dataString = req.query.dataString;
  dataString = dataString.split('~');

  let deviceToAdd = DeviceTrackingHistory({
    // deviceId: dataString[0] || 1 ,
    // lat: dataString[1] || 1000.0,
    // lng: dataString[2] || 123333.99,
    // date:  dataString[3] || new Date(),
    // temprature: dataString[4] || 0,
    // workingStatus:  1,
    // status: 'Active',

    deviceId: dataString[0] || 1,
    history: [
      {
        header: '$$',
        length: 116,
        alaramCode: '40',
        deviceId: dataString[0] || 1,
        vehicleStatus: '10811000',
        dateTime: dataString[3],
        batteryVoltage: '4.1V',
        supplyVoltage: '09V',
        ADC: '04.84V',
        temperatureA: dataString[4],
        temperatureB: dataString[4],
        LACCI: '01AA',
        cellID: '5125',
        GPSSatellites: '06',
        GSMsignal: '31',
        angle: '000',
        speed: '000',
        HDOP: '04.9',
        mileage: '0000000',
        latitude: dataString[1],
        NS: 'N',
        longitude: dataString[2],
        EW: 'E',
        serialNumber: '0001',
        checksum: '58',
        createdAt: new Date(),
        address: '49 2 C St - Dubai - United Arab Emirates',
        placeId: 'ChIJB8-fz9hCXz4RO9NeuHKWaok',
        state: 'Dubai',
        city: 'Dubai',
        country: 'United Arab Emirates',
        zipcode: 'NA'
      }
    ],
    workingStatus: 1,
    status: 'Active',
    createdAt: new Date()
  });

  try {
    let deviceToFind = {
      deviceId: dataString[0] || '1'
    };
    const deviceData = await Device.getOne(deviceToFind);
    if (deviceData) {
      deviceToAdd.deviceType = deviceData.deviceType;
      deviceToAdd.customerId = deviceData.customerId;
    } else {
      logger.info('Adding DeviceTrackingHistory...');
      res.send({ success: false, code: 500, Msg: msg.registerDevice });
    }

    const savedDeviceHistory = await DeviceTrackingHistory.addDeviceTrackingHistory(
      deviceToAdd
    );
    deviceToAdd = {
      query: { deviceId: deviceData.deviceId },
      data: {
        customerId: deviceData.customerId,
        deviceType: deviceData.deviceType,
        deviceId: dataString[0] || 1,
        lat: dataString[1] || 100288.0,
        lng: dataString[2] || 1002.0,
        date: dataString[3] || new Date(),
        temprature: dataString[4] || 0,
        workingStatus: 1,
        status: 'Active'
      }
    };

    console.log(deviceToAdd, ' F 2');
    const savedCurrentDeviceData = await DeviceTracking.addDeviceTracker(
      deviceToAdd
    );

    logger.info('Adding DeviceTrackingHistory...');
    res.send({
      success: true,
      code: 200,
      Msg: 'successfully add',
      data: savedDeviceHistory
    });
  } catch (err) {
    logger.error('Error in getting DeviceTrackingHistory- ' + err);
    res.send({
      success: false,
      code: 500,
      Msg: msg.addDeviceTrackingHistory,
      err: err
    });
  }
};

export default service;

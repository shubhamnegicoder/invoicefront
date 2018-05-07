/**
 * @file(deviceTrackerHistory.model.js) With Schema for deviceTrackerHistory model and all the db query function
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 11-Jan-2018
 * @lastModifedBy Shakshi
 */

import mongoose from 'mongoose';

/**
 * [DeviceTrackerHistorySchema is used for deviceTrackerHistory data validating aginst schema]
 * @type {[type]}
 */
// const DeviceTrackerHistorySchema = mongoose.Schema({
//     clientId : {type: Number },
//     deviceId: {type: String } ,
//     lat:{type: Number },
//     lng: {type: Number },
//     date: {type: Date},
//     temprature: {type: String},
//     deviceType: {type: String },
//     workingStatus: {type: String },
//     status:{type: String },
//     createdAt:{type: Date,default:Date.now}
// }, {collection : 'deviceTrackerHistory'});

// history Array Backup

// {
//   header : {type: String},
//   length : {type: Number},
//   alaramCode : {type: String},
//   deviceId : {type: String},
//   vehicleStatus : {type:String},
//   dateTime : {type: Date},
//   batteryVoltage : {type:String},
//   supplyVoltage : {type:String},
//   ADC : {type:String},
//   temperatureA : {type:String},
//   temperatureB : {type:String},
//   LACCI : {type:String},
//   cellID : {type:String},
//   GPSSatellites : {type:String},
//   GSMsignal : {type:String},
//   angle : {type:String},
//   speed : {type:String},
//   HDOP : {type:String},
//   mileage : {type:String},
//   latitude : {type:Number},
//   NS : {type:String},
//   longitude : {type:Number},
//   EW : {type:String},
//   serialNumber : {type:String},
//   checksum : {type:String},
//   createdAt:{type: Date},
//   address: {type:String},
//   placeId: {type:String},
//   state: {type:String},
//   city: {type:String},
//   country: {type:String},
//   zipcode: {type:String}
// }

const DeviceTrackerHistorySchema = mongoose.Schema({
          customerId : {type: String },
          deviceId: {type: String},
          history: [Object],
          deviceType: {type: String },
          workingStatus: {type: String },
          status:{type: String },
          createdAt:{type: Date}
        },{collection: 'deviceTrackerHistory'});

let DeviceTrackerHistoryModel = mongoose.model('deviceTrackerHistory', DeviceTrackerHistorySchema);

/**
 *@description [is used for getting all data of devices from db]
 * @return {object}
 */
DeviceTrackerHistoryModel.getAll = (condition) => {
    return DeviceTrackerHistoryModel.find(condition);
}

DeviceTrackerHistoryModel.findOne = (condition) =>{
    return DeviceTrackerHistoryModel.findOne(condition);
}

/**
 * @description [add one deviceTrackerHistory to db]
 * @param  {object}
 * @return {[object]}
 */
DeviceTrackerHistoryModel.addDeviceTrackingHistory = (deviceDataToAdd) => {
    return deviceDataToAdd.save();
}

DeviceTrackerHistoryModel.updateDeviceTrackerHistory = (deviceDataToAdd) => {
    return DeviceTrackerHistoryModel.findOneAndUpdate(deviceDataToAdd.query,deviceDataToAdd.data,{upsert:true});
}

DeviceTrackerHistoryModel.getAggregation = (query) => {
    return DeviceTrackerHistoryModel.aggregate(query);
}

/**
 * @description [responsible for remove devices from db based on condition]
 * @param  {object}
 * @return {[object]}
 */
DeviceTrackerHistoryModel.removeDevice = (deviceDataToDelete) => {
    return DeviceTrackerHistoryModel.remove({name: deviceDataToDelete});
}

export default DeviceTrackerHistoryModel;

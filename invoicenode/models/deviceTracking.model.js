/**
 * @file(deviceTrackeing.model.js) With Schema for DeviceTracker model and all the db query function
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 11-Jan-2018
 * @lastModifedBy Shakshi
 */

import mongoose from 'mongoose';

/**
 * [DeviceTrackerSchema is used for device data validating aginst schema]
 * @type {[type]}
 */
// const DeviceTrackerSchema = mongoose.Schema({
//     clientId : {type: Number },
//     deviceId: {type: String } ,
//     lat:{type: Number },
//     lng: {type: Number },
//     date: {type: Date},
//     temprature: {type: String},
//     deviceType: {type: String },
//     workingStatus: {type: String },
//     status:{type: String },
//     createdAt:{type: Date}
// }, {collection : 'deviceTracker'});

const DeviceTrackerSchema = mongoose.Schema({
    clientId : {type: Number },
    deviceId: {type: String},
  	header : {type: String},
  	length : {type: Number},
  	alaramCode : {type: String},
  	vehicleStatus : {type:String},
  	dateTime : {type: Date},
  	batteryVoltage : {type:String},
  	supplyVoltage : {type:String},
  	ADC : {type:String},
  	temperatureA : {type:String},
  	temperatureB : {type:String},
  	LACCI : {type:String},
  	cellID : {type:String},
  	GPSSatellites : {type:String},
  	GSMsignal : {type:String},
  	angle : {type:String},
  	speed : {type:String},
  	HDOP : {type:String},
  	mileage : {type:String},
  	latitude : {type:Number},
  	NS : {type:String},
  	longitude : {type:Number},
  	EW : {type:String},
  	serialNumber : {type:String},
  	checksum : {type:String},
    deviceType: {type: String },
    workingStatus: {type: String },
    status:{type: String },
    createdAt:{type: Date}
}, {collection : 'deviceTracker'});

let DeviceTrackerModel = mongoose.model('deviceTracker', DeviceTrackerSchema);

/**
 *@description [is used for getting all data of devices from db]
 * @return {object}
 */
DeviceTrackerModel.getAll = (condition) => {
    let query = {};
    if(condition){
        query = condition
    }
    return DeviceTrackerModel.find(query);
}

DeviceTrackerModel.findOne = (condition) =>{
    return DeviceTrackerModel.findOne(condition);
}

/**
 * @description [add one device to db]
 * @param  {object}
 * @return {[object]}
 */
DeviceTrackerModel.addDeviceTracker = (deviceDataToAdd) => {

    return DeviceTrackerModel.update(deviceDataToAdd.query,deviceDataToAdd.data,{upsert:true});
}

/**
 * @description [responsible for remove devices from db based on condition]
 * @param  {object}
 * @return {[object]}
 */
DeviceTrackerModel.removeDeviceTracker = (deviceDataToDelete) => {
    return DeviceTrackerModel.remove({name: deviceDataToDelete});
}

export default DeviceTrackerModel;

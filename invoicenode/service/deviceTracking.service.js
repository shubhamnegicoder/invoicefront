/**
 * @file(DeviceTracker.service.js) All service realted to DeviceTracker and entry handler file after routing  
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 7-Feb-2018
 * @lastModifedBy Shakshi
 */

import DeviceTracker from '../models/deviceTracking.model'
import logger from '../core/logger/app.logger' 
import msg from '../core/message/error.msg.js'
import utility from '../core/utility.js'
import successMsg from '../core/message/success.msg.js'

/**
 * [service is a object ]
 * @type {Object}
 */
const service = {};

/**
 * @description [with all the calculation before getAll function of model and after getAll]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.getAll = async (req,res) =>{
    let clientId = utility.removeQuotationMarks(req.query.clientId);

	try{
        let condition = {
            clientId:clientId
        }
		const deviceTracker = await DeviceTracker.getAll(condition);
        logger.info('sending all DeviceTracker...');
		res.send({success:true, code:200, msg:successMsg.allDeviceTrack,data:deviceTracker});
	}catch(err){
		logger.error('Error in getting DeviceTracker- ' + err);
		res.send({success:false, code:500, msg:msg.getDeviceTracking, err:err});
	}
}

/**
 * @description [calculation before add DeviceTracker to db and after adding DeviceTracker ]success
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addDeviceTracker = async (req, res) => {
    let deviceDataToAdd = DeviceTracker({
        name: req.body.name
    });
    try {
        const savedDevice = await DeviceTracker.addDevice(deviceDataToAdd);
        logger.info('Adding DeviceTracker...');
        res.send({success:true, code:200, msg:successMsg.addDeviceTrack,data:savedDevice});
        //res.send('added: ' + savedDevice);
    }
    catch(err) {
        logger.error('Error in getting DeviceTracker- ' + err);
        res.send({success:false, code:500, msg:msg.addDeviceTracking, err:err});

        //res.send('Got error in getAll');
    }
}
/**
 * @description [calculation before delete DeviceTracker to db and after delete DeviceTracker]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
service.deleteTracker = async (req, res) => {
    let deviceToDelete = req.body.name;
    try{
        const removedDevice = await DeviceTracker.removeCar(deviceToDelete);
        logger.info('Deleted DeviceTracker- ' + removedDevice);
        res.send({success:true, code:200, msg:successMsg.deleteDeviceTrack,data:removedDevice});

       // res.send('DeviceTracker successfully deleted');
    }
    catch(err) {
        logger.error('Failed to delete DeviceTracker- ' + err);
        res.send({success:false, code:500, msg:msg.deleteDeviceTracking, err:err});

        //res.send('Delete failed..!');
    }
}

export default service;
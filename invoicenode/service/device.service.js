/**
 * @file(device.service.js) All service realted to device and entry handler file after routing  
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 11-Jan-2018
 * @lastModifedBy Shakshi
 */

import Device from '../models/device.model'
import logger from '../core/logger/app.logger'
import msg from '../core/message/error.msg.js'
import successMsg from '../core/message/success.msg'
import utility from '../core/utility.js'



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
    if(!req.query.customerId){
        return res.send({"success":false,"code":"500","msg":"customerId is missing"});
    }
    // if(!req.query.clientId){
    //     res.send({"success":false,"code":"500","msg":"clientId is missing","data":req.query});
    // }
    //let clientId = utility.removeQuotationMarks(req.query.clientId);
    
	try{
        
		const device = await Device.getAll(req.query.customerId);
        logger.info('sending all device...');
		return res.send({"success":true,"code":"200","msg":successMsg.allDevice,"data":device});

	}catch(err){
		logger.error('Error in getting device- ' + err);
        return res.send({"success":false, "code":"500", "msg":msg.getDevice,"err":err}); 
	}
}
service.getOne=async(req,res)=>{
    let deviceToFind={
        deviceId:req.params.deviceId
    }
 
 try{
     const getOneDevice=await Device.getOne(deviceToFind);
     logger.info('get one device-' +getOneDevice);
     res.send({"success":true,"code":"200","msg":successMsg.getOneDevice,"data":getOneDevice});
 }
 catch(err){
     logger.error('Failed to get branch- ' + err);
     res.send({"success":false, "code":"500", "msg":msg.getDevice,"err":err});

 }

}

/**
 * @description [calculation before add Device to db and after adding Device ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.addDevice = async (req, res) => {

    if(!req.body.deviceName ){
      return res.send({"success":false,"code":"500","msg":"deviceName is missing"});
    }
    if(!req.body.customerId){
        return res.send({"success":false,"code":"500","msg":"customerId is missing"});
    }
    if(!req.body.deviceType){
        return res.send({"success":false,"code":"500","msg":"deviceType is missing"});
    }
    if(!req.body.deviceId){
        return res.send({"success":false,"code":"500","msg":"deviceId is missing"});
    }
    if(!req.body.brand){
        return res.send({"success":false,"code":"500","msg":"brand is missing"});
    }
    if(!req.body.assetId){
        return res.send({"success":false,"code":"500","msg":"assetId is missing"});
    }
    if(!req.body.serialNo){
        return res.send({"success":false,"code":"500","msg":"serialNo is missing"});
    }
    if(!req.body.simno){
        return res.send({"success":false,"code":"500","msg":"simno is missing"});
    }
    //let clientId = utility.removeQuotationMarks(req.body.clientId);

    let deviceToAdd = Device({
       
        customerId : req.body.customerId,  
        deviceId: req.body.deviceId,
        brand: req.body.brand,
        assetId : req.body.assetId,
        deviceType: req.body.deviceType,
        deviceName: req.body.deviceName,
        serialNo: req.body.serialNo,
        simno: req.body.simno,
        registerBy:req.body._id,
        status: req.body.status || "Active",
        createAt: new Date()
    });
    try {
        
        const savedDevice = await Device.addDevice(deviceToAdd);
        logger.info('Adding device...');
        res.send({"success":true, "code":"200", "msg":successMsg.addDevice,"data":savedDevice});
    }
    catch(err) {
        logger.error('Error in getting Device-22 ' + err);
        res.send({"success":false, "code":"5010", "msg":msg.addDevice , err:err});
       
    }
}
/**
 * @description [calculation before delete Device to db and after delete Device]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
service.deleteDevice = async (req, res) => {
    let deviceToDelete = req.body.name;
    if(!req.body.name){
        res.send({"success":false,"code":"500","msg":msg.deviceName});
    }
    try{
        const removedDevice = await Device.removeCar(deviceToDelete);
        logger.info('Deleted Device- ' + removedDevice);
        res.send({"success":true, "code":"200", "msg":successMsg.deleteDevice,"data":removedDevice});

    }
    catch(err) {
        logger.error('Failed to delete Device- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.deleteDevice , err:err});
    }
}

/**
 * @description [calculation before edit Device to db and after edit Device]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */

service.editDevice = async(req,res)=>{
    if(!req.body._id){
        res.send({"success":false,"code":500,"msg":msg._id})
    }
    let deviceEdit={
        status: req.body.status,
        createAt: new Date()

    }
    let deviceToEdit = {
        query:{"_id":req.body._id},
        data:{"$set":deviceEdit}
    };
    try{

    const editDevice= await Device.editDevice(deviceToEdit);
    logger.info("update device");
    console.log("update device");
    res.send({"success":true,"code":200,"msg":successMsg.editDevice,"data":editDevice});
    }
    catch(err){
        logger.error('Error in getting device- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.editDevice,"err":err});

    }

}

export default service;

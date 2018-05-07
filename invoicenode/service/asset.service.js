/**
 * @file(asset.service.js) All service realted to asset    
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 15-Jan-2018
 * @lastModifedBy Shakshi
 */


import Asset from '../models/asset.model'
import Device from '../models/device.model'
import logger from '../core/logger/app.logger' 
import msg from '../core/message/error.msg.js'
import successMsg from '../core/message/success.msg' 
import utility from '../core/utility.js'
import ObjectID from "bson-objectid";




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
    var location = {};
    if(!req.query.customerId){
        return res.send({"success":false,"code":"500","msg":"customerId is missing"});
    }
    if(req.query.location){
        location=req.query.location;
    }
    
    //let clientId = utility.removeQuotationMarks(req.query.clientId);
	try{

		let dataToFind = {
			query:{customerId:ObjectID(req.query.customerId)},//{$or:[{customerId:req.query.customerId}]}, //add location filter also beacuse of user assigned location, so user can see asset of coustmer of assigned location not outside of location
			projection:{}
		};

		if(req.query.isAssetType){
			dataToFind.projection = {
				assetType:1,assetId:1
			}
        }
        // console.log(dataToFind);
		const asset = await Asset.getAll(dataToFind);
        logger.info('sending all asset...');
		return res.send({success:true, code:200, msg:successMsg.allAsset, data:asset});
	}catch(err){
		logger.error('Error in getting asset- ' + err);
		return res.send({success:false, code:500, msg:msg.getAsset, err:err});

	}
}

/**
 * @description get all asset that is not associated with device
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.getAllAsset = async (req,res) =>{
    var location = {};
    if(!req.query.customerId){
        return res.send({"success":false,"code":"500","msg":"customerId is missing"});
    }
    if(!req.query._id){
        return res.send({"success":false,"code":"500","msg":"_id is missing"});
    }
    let dataToFind = {
            query:{customerId:ObjectID(req.query.customerId)},
            projection:{}
    };
    
    try{
        const Alldevices = await Device.allDevice(dataToFind);
        var assetArray = [];

        for(var i = 0; i<Alldevices.length; i++){
            console.log(typeof Alldevices[i].assetId)
            
            assetArray.push(Alldevices[i].assetId)
        }

        if(req.query.isAssetType){
            dataToFind.projection = {
                assetType:1,assetId:1
            }
        }
        var queryToFindAsset = {}
        if(assetArray.length){
            queryToFindAsset = {
                query:{_id:{$nin:assetArray},customerId:ObjectID(req.query.customerId)}
            }
        }else{
            queryToFindAsset = {
                query:{customerId:ObjectID(req.query.customerId)}
            }
        }
        
        // console.log(dataToFind);
        const asset = await Asset.allAsset(queryToFindAsset);
        logger.info('sending all asset...');
        return res.send({success:true, code:200, msg:successMsg.allAsset, data:asset});
    }catch(err){
        logger.error('Error in getting asset- ' + err);
        return res.send({success:false, code:500, msg:msg.getAsset, err:err});

    }
}
/**
 * @description [calculation before add Device to db and after adding asset ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addAsset = async (req, res) => {
    if(!req.body.customerId || !req.body.assetName || !req.body.assetTypeId || !req.body.serialNo){
            res.send({"success":false,"code":"500","msg":msg.param});
    }

    //let clientId = utility.removeQuotationMarks(req.body.clientId);
    let assetToAdd = Asset({
        customerId : req.body.customerId,
        assetTypeId: req.body.assetTypeId,
        assetName: req.body.assetName,
        serialNo: req.body.serialNo,
        address:req.body.address,
        minSpeed:req.body.minSpeed,
        maxSpeed:req.body.maxSpeed,
        minTemperature:req.body.minTemperature,
        maxTemperature:req.body.maxTemperature,
        city:req.body.city,
        country:req.body.country,
        state:req.body.state,
        area:req.body.area,
        registerBy:req.body._id,
        status: req.body.status || "Active",
        createAt: new Date()
    });

    try {
        
        const savedAsset = await Asset.addAsset(assetToAdd);
        logger.info('Adding asset...');
        return res.send({"success":true, "code":"200", "msg":successMsg.addAsset,"data":savedAsset});
    }
    catch(err) {
        logger.error('Error in getting Asset- ' + err);
        return res.send({"success":false, "code":"500", "msg":msg.addAsset,"err":err});
    }
}


/**
 * @description [calculation before edit Device to db and after edit Device]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
service.editAsset = async (req,res) => {
    let assetToEdit = {
        status: req.body.status
    };
    let assetEdit = {
        query:{"_id":req.body._id},
        data:{"$set":assetToEdit}

    };
    try {
        const editedAsset = await Asset.editAsset(assetEdit);
        logger.info('Adding asset...');
        console.log('Adding asset...');
        return res.send({"success":true, "code":"200", "msg":successMsg.editAsset,"data":editedAsset});
    }catch(err) {
        logger.error('Error in getting Asset- ' + err);
        return res.send({"success":false, "code":"500", "msg":msg.editAsset,"err":err});
    }
}



/**
 * @description [calculation before delete Device to db and after delete Device]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
service.deleteAsset = async (req, res) => {
    let assetToDelete = req.body.assetId;
    if(!req.body.assetId){
        return res.send({"success":false, "code":"500", "msg":msg.assetId});
    }
    try{ 
        const removedAsset = await Asset.removeAsset(assetToDelete);
        logger.info('Deleted asset- ' + removedAsset);
        return res.send({"success":true, "code":"200", "msg":successMsg.deleteAsset,"data":removedAsset});
    }
    catch(err) {
        logger.error('Failed to delete Asset- ' + err);
        return res.send({"success":false, "code":"500", "msg":msg.deleteAsset,"err":err});
    }
}

/** 
* @description [with all the calculation before getOne function of model and after getAll]
* @param  {[type]}
* @param  {[type]}
* @return {[type]}
*/
service.getOne= async(req,res)=>{

    let assetToFind={
        assetId:req.query.assetId
    }
    try{ 
        const getOneAsset=await Asset.getOne(assetToFind);
        logger.info('get one asset-' +getOneAsset);
        return res.send({"success":true,"code":"200","msg":successMsg.allAsset,"data":getOneAsset});
    }
    catch(err){
        logger.error('Failed to get Asset- ' + err);
        return res.send({"success":false, "code":"500", "msg":msg.getAsset,"err":err});

    }
}

export default service;

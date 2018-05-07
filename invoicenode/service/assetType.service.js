/**
 * @file(assetType.service.js) All service related to assetType    
 * @author Purti Singh <purti.singh20@gmail.com>
 * @version 1.0.0
 * @lastModifed 07-Feb-2018
 * @lastModifedBy Purti
 */

import AssetType from '../models/assetType.model'
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
 * @description [calculation for getting the assetType ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.getAll = async (req,res) =>{
    if(!req.query._id){
        return res.send({"success":false,"code":"500","msg":"_id is missing"});
    }
    //let clientId = utility.removeQuotationMarks(req.query.clientId);
	try{
		let dataToFind = {
			query:{createdBy:req.query._id},
			projection:{}
		};

		if(req.query.assetTypeId){
			dataToFind.projection = {
				assetTypeId:1
			}
		}
		const assetType = await AssetType.getAll(dataToFind);
        logger.info('sending all assetType...');
		return res.send({success:true, code:200, msg:successMsg.allAssetType, data:assetType});
	}catch(err){
		logger.error('Error in getting assetType- ' + err);
		return res.send({success:false, code:500, msg:msg.getAssetType, err:err});
	}
}

/**
 * @description [calculation for adding the assetType ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addAssetType = async (req, res) => {
    if(!req.body.customerId){
        return res.send({"success":false,"code":"500","msg":"customerId is missing"});
    }
     if(!req.body._id){
        return res.send({"success":false,"code":"500","msg":"_id is missing"});
    }
    if(!req.body.assetTypeName){
            return res.send({"success":false,"code":"500","msg":msg.param});
    }
    let assetTypeToAdd = AssetType({
        customerId: req.body.customerId,
        assetTypeName: req.body.assetTypeName,
        status: req.body.status,
        createdBy:req.body._id,
        createAt: new Date(),
        updatedAt: new Date()
    });
    try {
        
        const savedAssetType = await AssetType.addAssetType(assetTypeToAdd);
        return res.send({"success":true, "code":"200", "msg":successMsg.addAssetType,"data":savedAssetType});
    }
    catch(err) {
        logger.error('Error in getting AssetType- ' + err);
        return res.send({"success":false, "code":"500", "msg":msg.addAssetType,"err":err});
    }
}

/**
 * @description [calculation for deleting the assetType ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.deleteAssetType = async (req, res) => {
    let assetTypeToDelete = req.body.assetTypeId;
    if(!req.body.assetTypeId){
        return res.send({"success":false, "code":"500", "msg":msg.assetTypeId});

    }
    try{
        const removedAssetType = await AssetType.removeAssetType(assetTypeToDelete);
        logger.info('Deleted assetType-' + removedAssetType);
        return res.send({"success":true, "code":"200", "msg":successMsg.deleteAssetType,"data":removedAssetType});
    }
    catch(err) {
        logger.error('Failed to delete AssetType- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.deleteAssetType,"err":err});
    }
}

/**
 * @description [calculation for editing the assetType ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.updateAssetType = async (req, res) => {
        // let query = req.body;
        
       let edit={
        query:{"_id":req.body._id},
        data:{"$set":req.body}
       }

		try {
			const modifiedAssetType =	await AssetType.modifyAssetType(edit);
			return res.send({"success":true, "code":"200", "msg":successMsg.editAssetType,"data":modifiedAssetType});
		} catch (e) {
			return res.send({"success":false, "code":"500", "msg":msg.editAssetType,"err":e});
		}
}

export default service;

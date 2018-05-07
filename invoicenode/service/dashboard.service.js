import logger from '../core/logger/app.logger'
import mongoose from 'mongoose'
import User from '../models/user.model'
import Asset from '../models/asset.model'
import Device from '../models/device.model'
import CustomerModel from '../models/customer.model';
import utility from '../core/utility.js'
import successMsg from '../core/message/success.msg'
import msg from '../core/message/error.msg'
import ObjectID from "bson-objectid";


const service={}

service.getCount=async(req,res)=>{
    var query = {};
    if(!req.query._id){
        return res.send({success:false, code:500, msg:"_id is missing" });
    }else{
        query ={
            registerBy:req.query._id
        } 
    }

    let userToCount={
        query:{parentId:ObjectID(req.query._id) || ""},
        projection:{}
    };
    
    if(req.query.customerId !== 'null' && req.query.customerId !== '' && req.query.customerId !== undefined){
        console.log("+++++")
        userToCount = {
            query:{customerIds: { $elemMatch: { $eq: req.query.customerId } }}
        }
        query = {customerId :ObjectID(req.query.customerId)}
    }
   
    
    let assetToCount={
        query:query,
        projection:{}
    };
    let deviceToCount={
        query:query,
        projection:{}
    };
    try{
        const getUserCount = await User.getCount(userToCount);
        const getAssetCount = await Asset.getCount(assetToCount);
        const getDeviceCount = await Device.getCount(deviceToCount);
        var getCustomerCount=0;
        var etLoogedUser = 0;
        var getLoogedUser;
        if(!query.customerId){
            getCustomerCount = await CustomerModel.getCount({createdBy:req.query._id});
            getLoogedUser = await User.getOne({_id:ObjectID(req.query._id)});
            if(getLoogedUser){
                var count = getLoogedUser.customerIds?getLoogedUser.customerIds.length:0;
                getCustomerCount = getCustomerCount+count;
            }
        }

        let data=[{"allUser":getUserCount,"allAsset":getAssetCount,"allDevice":getDeviceCount, "allCustomer":getCustomerCount}];
        logger.info('get all user');
        res.send({"success":true,"code":"200","msg":successMsg.getUser,"data":data});
    }
    catch(err){
        logger.error('Error in getting userCount- ' + err);
		return res.send({success:false, code:500, msg:msg.getUser, err:err});
    }
}

export default service;
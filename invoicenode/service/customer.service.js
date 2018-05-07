/**
 * @file(asset.service.js) All service realted to asset    
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 15-Jan-2018
 * @lastModifedBy Shakshi
 */


import CustomerModel from '../models/customer.model';
import UserModel from '../models/user.model'
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

service.addCustomer = async (req,res)=>{
	if(!req.body.customerName){
		return res.send({success:false, code:500, msg:"CustomerName is missing"})
	}
	// if(req.body.email){
		
	// }
	// if(req.body.sms){
	// 	return res.send({success:false, code:500, msg:"sms is missing"})
	// }
	// if(req.body.notification){
	// 	return res.send({success:false, code:500, msg:"notification is missing"})
	// }
	if(!req.body._id){
		return res.send({success:false, code:500, msg:"Id is missing"})
	}
	var objToAdd = CustomerModel({
		customerName:req.body.customerName,
		createdBy:req.body._id,
		alert:{
			email:req.body.email?true:false,
			sms:req.body.sms?true:false,
			notification:req.body.notification?true:false
		},
		status:"Active",
		createdAt:new Date()
	})
	try{
		var savedCustomer = await CustomerModel.addCustomer(objToAdd);
		res.send({success:true, code:200, msg:"Successfully add"})
	}catch(error){
		res.send({success:false, code:500, msg:"Error in add Customer", err:error})
	}
	

}

/**
 * @description [with all the calculation before getAll function of model and after getAll]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.getAll = async (req,res)=>{
	
	console.log(req.query,"req.query._id")
	if(!req.query._id){
			return res.send({success:false, code:500, msg:"user_id is missing"})
	}
	var customerIds={createdBy:req.query._id};
	try{
		var userData = await UserModel.getOne({_id:req.query._id});
		if(userData){
			customerIds = {$or:[{_id:{$in:userData.customerIds}},{createdBy:req.query._id}]}
		}
		var allCustomer = await CustomerModel.allCustomer(customerIds);
		return res.send({success:true, code:200, msg:"Successfully found", data:allCustomer});

	}catch(error){
		res.send({success:false, code:500, msg:"Error in add Customer", err:error})
	}
}

service.editCustomer = async (req,res)=>{
	if(!req.body._id){
		return res.send({success:false, code:500, msg:"_id is missing"})
	}
	if(!req.body.status){
		return res.send({success:false, code:500, msg:"status is missing"})
	}
	try{
		var objtoUpdate={
			query:{_id:req.body._id},
			data:{$set:{status:req.body.status}}
		}
		var updatedCustomer = await CustomerModel.editCustomer(objtoUpdate);
		return res.send({success:true, code:200, msg:"Successfully updated", data:updatedCustomer});

	}catch(error){
		res.send({success:false, code:500, msg:"Error in update Customer", err:error})
	}
}

export default service;
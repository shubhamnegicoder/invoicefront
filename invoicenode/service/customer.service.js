/**
 * @file(customer.service.js) All service realted to asset    
 * @author Purti Singh <purti.singh@limitlessmobil.com>
 * @version 1.0.0
 * @lastModifed 03-May-2018
 * @lastModifedBy Purti
 */


import CustomerModel from '../models/customer.model';

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
service.getAll = async (req,res)=>{
	try{
		var allCustomer = await CustomerModel.allCustomer();
		return res.send({success:true, code:200, msg:"Successfully found", data:allCustomer}); 
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in getting Customer", err:error})
	}
}

/**
 * @description [with all the calculation before getOne function of model and after getOne]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.getOne = async (req,res)=>{

	try{
		let dataToFind={
			query:{"_id":req.query._id}
	
		};
		var oneCustomer = await CustomerModel.oneCustomer(dataToFind);
		return res.send({success:true, code:200, msg:"Successfully found", data:oneCustomer}); 
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in getting Customer", err:error})
	}
}

/**
 * @description [with all the calculation before add function of model and after add]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addCustomer = async (req,res)=>{
	if(req.body.customerCode == ""){
		return res.send({success:false,code:500,msg:"Customer code is required"});
	}
	if(req.body.customerName == ""){
		return res.send({success:false,code:500,msg:"Customer name is required"});
	}
	if(req.body.customerGSTNo == ""){
		return res.send({success:false,code:500,msg:"Customer GST no is required"});
	}
	if(req.body.addressLine1 == ""){
		return res.send({success:false,code:500,msg:"Address is required"});
	}
	if(req.body.addressLine2 == ""){
		return res.send({success:false,code:500,msg:"Address is required"});
	}
	if(req.body.city == ""){
		return res.send({success:false,code:500,msg:"City is required"});
	}
	if(req.body.state == ""){
		return res.send({success:false,code:500,msg:"State is required"});
	}
	if(req.body.country == ""){
		return res.send({success:false,code:500,msg:"Country is required"});
	}
	if(req.body.postalCode == ""){
		return res.send({success:false,code:500,msg:"Postal code is required"});
	}
	if(req.body.contactNo == ""){
		return res.send({success:false,code:500,msg:"Contact no is required"});
	}
	if(req.body.status == ""){
		return res.send({success:false,code:500,msg:"Status is required"});
	}
	if(req.body.createdBy == ""){
		return res.send({success:false,code:500,msg:"Created by is required"});
	}
	// if(req.body.modifiedBy == ""){
	// 	return res.send({success:false,code:500,msg:"Modified by is required"});
	// }
	// if(req.body.modifiedOn == ""){
	// 	return res.send({success:false,code:500,msg:"Modified on is required"});
	// }
	let customerToAdd = CustomerModel({
		customerName: req.body.customerName,
        customerCode : req.body.customerCode,   
        customerGSTNo: req.body.customerGSTNo,
        addressLine1: req.body.addressLine1,
        addressLine2:req.body.addressLine2,
        cityCode:req.body.cityCode,
        stateCode:req.body.stateCode,
        countryCode:req.body.countryCode,
        postalCode:req.body.postalCode,
        contactNo:req.body.contactNo,
        status: req.body.status
		//createdBy: req.body.createdBy		
    });
	try{
		console.log("this is add Customer");
		var addCustomer = await CustomerModel.addCustomer(customerToAdd);
		return res.send({success:true, code:200, msg:"Successfully added", data:addCustomer}); 
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in adding Customer", err:error})
	}
}

service.editCustomer = async (req,res)=>{
	let customerToEdit={
		
		customerCode:req.body.customerCode,
		customerName:req.body.customerName,
		customerGSTNo:req.body.customerGSTNo,
		addressLine1:req.body.addressLine1,
		addressLine2:req.body.addressLine2,
		cityCode:req.body.cityCode,
		stateCode:req.body.stateCode,
		countryCode:req.body.countryCode,
		postalCode:req.body.postalCode,
		contactNo:req.body.contactNo
		// modifiedBy:,
		// modifiedOn:
	};
	try{
		let customerEdit = {
			query:{"_id":req.body._id},
			data:{"$set":customerToEdit}
	
		};
		//console.log("_id",req.body._id);
		var editCustomer = await CustomerModel.editCustomer(customerEdit);

		return res.send({success:true, code:200, msg:"Successfully edited", data:editCustomer}); 
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in editing Customer", err:error})
	}
}

export default service;
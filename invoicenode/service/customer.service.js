/**
 * @file(customer.service.js) All service realted to asset    
 * @author Purti Singh <purti.singh@limitlessmobil.com>
 * @version 1.0.0 
 * @lastModifed 03-May-2018
 * @lastModifedBy Purti
 */


import CustomerModel from '../models/customer.model';
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
service.getAll = async (req,res)=>{ 
	if(!req.query.id){
		return res.send({success:false, code:500, msg:"User Id is required"})
	}
	try{
		let getCustomer={query:{createdBy:ObjectID(req.query.id)}}
		var allCustomer = await CustomerModel.allCustomer(getCustomer);
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
		return res.send({success:false, code:500, msg:"Error in getting Customer"+error, err:error})
	}
}

service.searchCustomer = async (req,res)=>{
//    console.log(req.query,"+++++++++++++++++++++++++++")
  
	try{
		
		let	query={ }
		if(req.query.customerName!==''){
			query.customerName={ $regex: '.*' + req.query.customerName + '.*' } 
		}
		if(req.query.cityCode!==''){
			query.cityCode=req.query.cityCode
		}
		 if(req.query.countryCode!==''){
			query.countryCode=req.query.countryCode
		}
		if(req.query.stateCode!==''){
			query.stateCode=req.query.stateCode
		}
		
		// console.log(query,"kookokokokokoklllllllllllll")
		var oneCustomer = await CustomerModel.searchCustomer(query);
		// console.log(oneCustomer,"lllllllllllll")
		return res.send({success:true, code:200, msg:"Successfully found", data:oneCustomer}); 
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in getting Customer"+error, err:error})
	}
}


/**
 * @description [with all the calculation before add function of model and after add]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addCustomer = async (req,res)=>{
	console.log("+++++++++++id++++++++++++++++++",req.body.id);
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
	if(req.body.isActive == ""){
		return res.send({success:false,code:500,msg:"Status is required"});
	}
	if(req.body.id == ""){
		return res.send({success:false,code:500,msg:"Created by is required"});
	}

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
		isActive: req.body.isActive,
		createdBy: req.body.id,
		createAt:req.body.createAt		
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
		contactNo:req.body.contactNo,
		isActive:req.body.isActive,
		modifiedBy:req.body.id,
		updatedAt:req.body.updatedAt
		
	};
	try{
		let customerEdit = {
			query:{"_id":req.body._id},
			data:{"$set":customerToEdit}
	
		};
		var editCustomer = await CustomerModel.editCustomer(customerEdit);
		return res.send({success:true, code:200, msg:"Successfully edited", data:editCustomer}); 
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in editing Customer", err:error})
	}
}
service.getOneCustomer = async (req,res)=>{

	try{
		let dataToFind = {
			query:{"customerCode":req.query.customerCode}
	
		};
		var oneCustomer = await CustomerModel.getOneCustomer(dataToFind);
		return res.send({success:true, code:200, msg:"Successfully found", data:oneCustomer}); 
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in getting Customer"+error, err:error})
	}
}

 
export default service;
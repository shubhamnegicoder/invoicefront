/**
 * @file(company.service.js) All service realted to asset    
 * @author Purti Singh <purti.singh@limitlessmobil.com>
 * @version 1.0.0
 * @lastModifed 11-May-2018
 * @lastModifedBy Purti
 */


import CompanyModel from '../models/company.model';
import ObjectID from "bson-objectid";  
import path from 'path';
import formidable from "formidable";
import fs from "fs-extra";
import filesys from "fs";


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
	console.log("**************req.query.id*************",req,"*************************");
	if (!req.query.id) {
        return res.send({ "success": false, "code":500, msg: " User Id is missing" });
	}
	let queryToFindCompany = {
		query: {createdBy : ObjectID(req.query.id)} 
	};
	try{
		console.log("queryToFindCompany",queryToFindCompany);
		var allCompany = await CompanyModel.allCompany(queryToFindCompany);
		console.log(allCompany,"====== allCompany");
		
		return res.send({success:true, code:200, msg:"Successfully found", data:allCompany}); 
	}
	catch(error){
		return res.send({success:false, code:500, msg:"Error in getting Company", err:error});
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
			query:{'_id':req.query._id}
		};
		var oneCompany = await CompanyModel.oneCompany(dataToFind);
		return res.send({success:true, code:200, msg:"Successfully found", data:oneCompany}); 
	}
	catch(error){
		return res.send({success:false, code:500, msg:"Error in getting Company", err:error})
	}
}

/**
 * @description [with all the calculation before add function of model and after add]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]} 
 */ 
service.addCompany = async (req,res)=>{	
	console.log("company Name of add company like req.body.companyName");	
	var form = new formidable.IncomingForm();
	console.log("form:",form);
	form.parse(req, async (err, fields, files)=> {
		console.log("files",files.file);
		let result= await service.getOneByCompanyName(fields.companyName);
		var hashLogo='';
		if(result=='' ){
			if(files.file!=undefined)
			{
				hashLogo =fields.companyName+"_"+fields.logo;
				var oldpath = files.file.path;
				var newpath =  '../public/uploads/'+fields.companyName+"_"+files.file.name;
				fs.copy(oldpath, newpath, err => {
					if (err) return console.log(err)
				});
				fs.close();
				service.addFile(fields,res,hashLogo);
			}
			else{
				service.addFile(fields,res,hashLogo);
			}
		}
		else{
			console.log("result of company service in add company in else:::",result);
			return res.send({success:false, code:500, msg:"Company name already exist"});	
		}
	});
}

service.addFile = async(req,res,hashLogo)=>{
	if(req.id == ""){
		return res.send({success:false,code:500,msg:"User Id is required"});
	}
	if(req.companyCode == ""){
		return res.send({success:false,code:500,msg:"Company code is required"});
	}
	if(req.companyName == ""){
		return res.send({success:false,code:500,msg:"Company name is required"});
	}
	if(req.companyGSTNo == ""){
		return res.send({success:false,code:500,msg:"Company GST no is required"});
	}
	if(req.addressLine1 == ""){
		return res.send({success:false,code:500,msg:"Address is required"});
	}
	if(req.addressLine2 == ""){
		return res.send({success:false,code:500,msg:"Address is required"});
	}
	if(req.cityCode == ""){ 
		return res.send({success:false,code:500,msg:"City is required"});
	}
	if(req.stateCode == ""){
		return res.send({success:false,code:500,msg:"State is required"});
	}
	if(req.countryCode == ""){
		return res.send({success:false,code:500,msg:"Country is required"});
	}
	if(req.postalCode == ""){
		return res.send({success:false,code:500,msg:"Postal code is required"});
	}
	if(req.contactNo == ""){
		return res.send({success:false,code:500,msg:"Contact no is required"});
	}
	if(req.contactNo.length < 10 || req.contactNo.length > 10){
		return res.send({success:false,code:500,msg:"Contact no should be of 10 digits"});
	}
	if(isNaN(req.contactNo)){
		return res.send({success:false,code:500,msg:"Contact no should be numeric value"});
	}
	if (isNaN(req.postalCode)) {
		return res.send({success:false,code:500,msg:"Postal code should be numeric value"});
	}

	let companyToAdd = CompanyModel({
		companyName: req.companyName,
		companyCode : req.companyCode, 
		logo:hashLogo,  
        companyGSTNo: req.companyGSTNo,
        addressLine1: req.addressLine1,
        addressLine2:req.addressLine2,
        cityCode:req.cityCode,
        stateCode:req.stateCode,
        countryCode:req.countryCode,
        postalCode:req.postalCode,
        contactNo:req.contactNo,
      	isActive: req.isActive,
		createAt:req.createAt,
		createdBy: req.id		
    });
	try{
		var addCompany = await CompanyModel.addCompany(companyToAdd);
		return res.send({success:true, code:200, msg:"Successfully added", data:addCompany}); 
	}
	catch(error){
		return res.send({success:false, code:500, msg:"Error in adding Company", err:error})
	}
}
service.editCompany = async(req,res)=>{
	var form = new formidable.IncomingForm();	
	form.parse(req, async (err, fields, files)=> {
		var hashLogo='';
		if(fields.oldCompanyName!= fields.companyName){
			console.log("********************edit company if of oldCompanyName******");
			let	result= await service.getOneByCompanyName(fields.companyName);
			if(result==''){
				console.log("*********** edit company result=''***********");
	   			if(files.file!=undefined){
					console.log("edit company files.file!=undefined");
/////////////////////////////////////delete old logo////////////////////////////////////

					filesys.unlink('../public/uploads/'+fields.oldLogo,function(err){
						if(err) return console.log("logo delete error"+err);
						console.log('file deleted successfully');
					}); 
					console.log("###############################");
/////////////////////////////////////delete old logo////////////////////////////////////
					console.log("###############################");
		 			hashLogo = fields.companyName+"_"+files.file.name;  
					var oldpath = files.file.path;
					var newpath =  '../public/uploads/'+fields.companyName+"_"+files.file.name;
					fs.copy(oldpath, newpath, err => {
						if (err) return console.log(err)
					});
					fs.close();
					service.editCompany1(fields,res,hashLogo);
				}
				else{
					console.log("**********edit company else part of files.file!=undefined*****");
					hashLogo=fields.oldLogo;
					service.editCompany1(fields,res,hashLogo);
				}
			}
			else{
				return res.send({success:false,code:500,msg:"Company Name already exist"});
			}
		}
		else{
			console.log("**********else part of fields!=undefined************");
			
			if(files.file!=undefined){
				console.log("edit company in else's else files.file!=undefined");
/////////////////////////////////////delete old logo////////////////////////////////////

				filesys.unlink('../public/uploads/'+fields.oldLogo,function(err){
					if(err) return console.log("logo delete error"+err);
					console.log('file deleted successfully');
				}); 
				console.log("###############################");
/////////////////////////////////////delete old logo////////////////////////////////////
				console.log("###############################");
				 hashLogo = fields.companyName+"_"+files.file.name;  
				var oldpath = files.file.path;
				var newpath =  '../public/uploads/'+fields.companyName+"_"+files.file.name;
				fs.copy(oldpath, newpath, err => {
					if (err) return console.log(err)
				});
				fs.close();
				service.editCompany1(fields,res,hashLogo);
			}
			else{
				console.log("**********edit company else's part of files.file!=undefined*****");
				hashLogo=fields.oldLogo;
				service.editCompany1(fields,res,hashLogo);
			}
		}
		
	});
}

service.editCompany1 = async (req,res,hashLogo)=>{
	console.log("###############################");
	if(req._id==""){
		return res.send({success:false, code:500, msg:"_id is required"});        
	}
	if(req.companyCode==""){
		return res.send({success:false, code:500, msg:"Company code is required"});           
	}
	if(req.companyName==""){
		return res.send({success:false, code:500, msg:"Company name is required"});       
	}
	if(req.companyGSTNo==""){
		return res.send({success:false, code:500, msg:"Company GST No is required"});       
	}
	if(req.addressLine1==""){
		return res.send({success:false, code:500, msg:"Address Line 1 is required"});       
	}
	if(req.addressLine2==""){
		return res.send({success:false, code:500, msg:"Address Line 2 is required"});       
	}
	if(req.cityCode==""){
		return res.send({success:false, code:500, msg:"City code is required"});        
	}
	if(req.stateCode==""){
		return res.send({success:false, code:500, msg:"State code is required"});        
	}
	if(req.countryCode==""){
		return res.send({success:false, code:500, msg:"Country code is required"});        
	}
	if(req.postalCode=="" ){
		return res.send({success:false, code:500, msg:"Postal code is required"});       
	}	
	if(req.contactNo==""){
		return res.send({success:false, code:500, msg:"Contact No is required"});       
	}
	if(req.contactNo.length < 10 || req.contactNo.length > 10){
		return res.send({success:false,code:500,msg:"Contact no should be of 10 digits"});
	}
	if(isNaN(req.contactNo)){
		return res.send({success:false,code:500,msg:"Contact no should be numeric value"});
	}
	if (isNaN(req.postalCode)) {
		return res.send({success:false,code:500,msg:"Postal code should be numeric value"});
	}
	
	if(req.logo==""){	
		console.log("###############################");
		let companyToEdit={			
			companyCode:req.companyCode,	
			companyName:req.companyName,
			logo:"",
			companyGSTNo:req.companyGSTNo,
			addressLine1:req.addressLine1,
			addressLine2:req.addressLine2,
			cityCode:req.cityCode,
			stateCode:req.stateCode,
			countryCode:req.countryCode,
			postalCode:req.postalCode,
			contactNo:req.contactNo,
			isActive:req.isActive,
			modifiedBy:req.id,
			updatedAt:req.updatedAt
		};
		let companyEdit = {
			query:{"_id":req._id},
			data:{"$set":companyToEdit}
		};
		try{
		var editCompany = await CompanyModel.editCompany(companyEdit);
		console.log("***************req.id***********",req.id);
		return res.send({success:true, code:200, msg:"Successfully edited", data:editCompany}); 
		}catch(error){
			return res.send({success:false, code:500, msg:"error in editing", err:error});
		}
	}
	else{
		let companyToEdit={			
			companyCode:req.companyCode,
			logo:hashLogo,
			companyName:req.companyName,
			companyGSTNo:req.companyGSTNo,
			addressLine1:req.addressLine1,
			addressLine2:req.addressLine2,
			cityCode:req.cityCode,
			stateCode:req.stateCode,
			countryCode:req.countryCode,
			postalCode:req.postalCode,
			contactNo:req.contactNo,
			isActive:req.isActive,
			modifiedBy:req.id,
			updatedAt:req.updatedAt
		};
		let companyEdit = {
			query:{"_id":req._id},
			data:{"$set":companyToEdit}
		
		};
		try{
		var editCompany = await CompanyModel.editCompany(companyEdit);
		return res.send({success:true, code:200, msg:"Successfully edited", data:editCompany}); 		
	}	catch(error){
		return res.send({success:false, code:500, msg:"error in editing", err:error});
	}}
}
service.getOneCompany = async (req,res)=>{ 
	try{
		let dataToFind={ 
			query:{"companyCode":req.query.companyCode}
		};
		var oneCompany = await CompanyModel.getOneCompany(dataToFind);
		return res.send({success:true, code:200, msg:"Successfully found", data:oneCompany}); 
	}
	catch(error){
		return res.send({success:false, code:500, msg:"Error in getting Company", err:error})
	}
}


 service.getOneByCompanyName= async (companyName)=>{ 
	try{
		let dataToFind={ 
			query:{ companyName:companyName}
		};
		console.log("companyName of getOneByCompanyName is",dataToFind.query.companyName);
		var oneCompany = await CompanyModel.getOneByCompanyName(dataToFind);
		return oneCompany;
	}
	catch(error){
		return '';
	}
}

// service.getByCompanyName= async (companyName)=>{ 
// 	try{
// 		let dataToFind={ 
// 			query:{ companyName:companyName}
// 		};
// 		var oneCompany = await CompanyModel.getOneCompany(dataToFind);
// 		return res.send({success:true, code:200, msg:"Successfully found", data:oneCompany});
// 	}
// 	catch(error){
// 		return res.send({success:false, code:500, msg:"Error in getting Company", err:error})
// 	}
// }

service.removeLogo = async(req,res)=>{
	var form = new formidable.IncomingForm();
	form.parse(req, async (err, fields, files)=> {
		filesys.unlink('../public/uploads/'+fields.logo,function(err){
			if(err) return console.log("logo delete error"+err);
			console.log('file deleted successfully');
	   }); 	  
		fs.close();
		service.removeLogo1(fields,res);
		return res.send({success:true, code:200, msg:"Logo removed successfully"});
	});
}


service.removeLogo1 = async (req,res)=>{
	var logoToRemove = {		
			logo:"",			
			modifiedBy:req.id,
			updatedAt:req.updatedAt	
	};
	try{
		let dataToRemove={ 
			query:{ _id:req._id},
				data:{"$set":logoToRemove}		
		};
		var removeCompany = await CompanyModel.removeLogo(dataToRemove);
		return res.send({success:true, code:200, msg:"Successfully removed", data:removeCompany});
	}
	catch(error){
		return res.send({success:false, code:500, msg:"Error in removing logo", err:error})
	}
}

service.searchCompany = async (req,res)=>{
	console.log(req.query,"+++++++++++++++++++++++++++")   
	 try{		 
		 let	query={ }
		 if(req.query.companyName!==''){
			 query.companyName={ $regex: '.*' + req.query.companyName + '.*' } 
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
		 
		 console.log(query,"kookokokokokoklllllllllllll")
		 var oneCompany = await CompanyModel.searchCompany(query);
		 return res.send({success:true, code:200, msg:"Successfully found", data:oneCompany}); 
		}catch(error){
			return res.send({success:false, code:500, msg:"Error in getting Company"+error, err:error})
		}
	}

export default service; 
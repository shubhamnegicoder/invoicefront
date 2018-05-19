/**
 * @file(company.service.js) All service realted to asset    
 * @author Purti Singh <purti.singh@limitlessmobil.com>
 * @version 1.0.0
 * @lastModifed 11-May-2018
 * @lastModifedBy Purti
 */


import CompanyModel from '../models/company.model';

/**
 * [service is a object ]
 * @type {Object}
 */
const service = {};


// imageUpload=()=>{
// 	if(req.url=="/addCompany"){
// 		var form = new formidable.IncomingForm();
// 		form.parse(req,function(err,fields,files){
// 			var oldPath = files.fileToUpload.path;
// 			var fileName = "uploaded_image/img_"+files.fileToUpload.name;
// 			fs.rename(oldPath,fileName,function(err){
// 				if(err) throw err;
// 				console.log("File Uploaded Successfully!");
// 			})
// 		})
// 	}
// }
/**
 * @description [with all the calculation before getAll function of model and after getAll]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.getAll = async (req,res)=>{
	try{
		var allCompany = await CompanyModel.allCompany();
		return res.send({success:true, code:200, msg:"Successfully found", data:allCompany}); 
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in getting Company", err:error})
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
	}catch(error){
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
	console.log("callinggggg ");
	if(req.body.companyCode == ""){
		return res.send({success:false,code:500,msg:"Company code is required"});
	}
	if(req.body.companyName == ""){
		return res.send({success:false,code:500,msg:"Company name is required"});
	}
	if(req.body.companyGSTNo == ""){
		return res.send({success:false,code:500,msg:"Company GST no is required"});
	}
	if(req.body.addressLine1 == ""){
		return res.send({success:false,code:500,msg:"Address is required"});
	}
	if(req.body.addressLine2 == ""){
		return res.send({success:false,code:500,msg:"Address is required"});
	}
	if(req.body.cityCode == ""){
		return res.send({success:false,code:500,msg:"City is required"});
	}
	if(req.body.stateCode == ""){
		return res.send({success:false,code:500,msg:"State is required"});
	}
	if(req.body.countryCode == ""){
		return res.send({success:false,code:500,msg:"Country is required"});
	}
	if(req.body.postalCode == ""){
		return res.send({success:false,code:500,msg:"Postal code is required"});
	}
	if(req.body.contactNo == ""){
		return res.send({success:false,code:500,msg:"Contact no is required"});
	}
	// if(req.body.isActive == ""){
	// 	return res.send({success:false,code:500,msg:"Status is required"});
	// }
	// if(req.body.createdBy == ""){
	// 	return res.send({success:false,code:500,msg:"Created by is required"});
	// }
	if(req.body.logo == ""){
		return res.send({success:false,code:500,msg:"Logo is required"});
	}
	
	let companyToAdd = CompanyModel({
		companyName: req.body.companyName,
		companyCode : req.body.companyCode, 
		logo:req.body.logo,  
        companyGSTNo: req.body.companyGSTNo,
        addressLine1: req.body.addressLine1,
        addressLine2:req.body.addressLine2,
        cityCode:req.body.cityCode,
        stateCode:req.body.stateCode,
        countryCode:req.body.countryCode,
        postalCode:req.body.postalCode,
        contactNo:req.body.contactNo,
      isActive: req.body.isActive,
	//	createdBy: req.body.createdBy,
		createAt:req.body.createAt	
    });
	try{
		 console.log("this is add Company");
		// console.log("treq.file",req.file);
		var addCompany = await CompanyModel.addCompany(companyToAdd);
		console("returning "+addCompany);
		return res.send({success:true, code:200, msg:"Successfully added", data:addCompany}); 
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in adding Company", err:error})
	}
}

service.editCompany = async (req,res)=>{
	//console.log("this is edit company");
	
	let companyToEdit={		
		companyCode:req.body.companyCode,
		companyName:req.body.companyName,
		companyGSTNo:req.body.companyGSTNo,
		addressLine1:req.body.addressLine1,
		addressLine2:req.body.addressLine2,
		city:req.body.city,
		state:req.body.state,
		country:req.body.country,
		postalCode:req.body.postalCode,
		contactNo:req.body.contactNo,
		modifiedBy:req.body.modifiedBy,
		updatedAt:req.body.updatedAt
	};
	try{
		let companyEdit = {
			query:{"_id":req.body._id},
			data:{"$set":companyToEdit}
	
		};
		//console.log("_id",req.body._id);
		var editCompany = await CompanyModel.editCompany(companyEdit);

		return res.send({success:true, code:200, msg:"Successfully edited", data:editCompany}); 
	}catch(error){
		return res.send({success:false, code:500, msg:"Error in editing Company", err:error})
	}
}

export default service;
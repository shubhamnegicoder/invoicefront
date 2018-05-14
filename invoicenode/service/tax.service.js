/**
 * @file(user.service.js) All service realted to user  
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 5-Feb-2018
 * @lastModifedBy Shakshi
 */

// import User from '../models/user.model'
// import roleConfig from '../models/role.model'
// import Customer from '../models/customer.model'
// import logger from '../core/logger/app.logger'
// import successMsg from '../core/message/success.msg'
// import msg from '../core/message/error.msg.js'
// import utility from '../core/utility.js' 
// import  crypto from 'crypto'
// import jwt from 'jsonwebtoken'
// import nm from 'nodemailer'
// import rand from 'csprng'
// import ObjectID from "bson-objectid";
// import RoleConfig from '../models/role.model'
import Tax from '../models/tax.model'


/**
 * [service is a object ]
 * @type {Object}
 */

const service = {};

service.getAll = async (req,res) =>{
	try{
		// let dataToFind = {
		// 	query:{parentId:ObjectID(req.query._id)}
		// };
		const tax = await Tax.getAll();
        res.send({success:true, code:200, msg:"success", data:tax});
        // console.log(tax,"data");
	}catch(err){
        // logger.error('Error in getting user- ' + err);
        // console.log(err);
		res.send({success:false, code:500, msg:"error", err:err});
	}
}






/**
 * @description [calculation before add user to db and after adding users ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addTax = async (req, res) => {
    console.log(req.body,"hi")
  if(!req.body.taxCode|| !req.body.taxName || !req.body.igst || !req.body.sgst || !req.body.cgst ){
          return res.send({"success":false, "code":"500","msg":"error"});
    }

    let taxToAdd = Tax({
     
      taxCode: req.body.taxCode,
      taxName: req.body.taxName,
      cgst: req.body.cgst,
      sgst:req.body.sgst,
      igst:req.body.igst,
      isActive:req.body.isActive , 
    //   createdBy: req.body._id,
    //   modifiedBy: {type:mongooseSchema.ObjectId },
    //   modifiedOn:new Date()
    });
    

    try {
        
        const savedTax = await Tax.addTax(taxToAdd);
        // console.log("isactive" + req)
        // logger.info('Adding tax...');
       console.log("savedTax" +savedTax);
        res.send({"success":true, "code":"200", "msg":"success","data":savedTax});
    }
    catch(err) {
        // logger.error('Error in getting User- ' + err);
        console.log(err)
        res.send({"success":false, "code":"500", "msg":"errorr","err":err});
    }
}

service.editTax = async(req,res)=>{
    if(!req.body._id){
        res.send({"success":false,"code":500,"msg":msg._id})
    }
    let TaxEdit={
        taxName: req.body.taxName,
        cgst: req.body.cgst,
        sgst:req.body.sgst,
        igst:req.body.igst,
        isActive:req.body.isActive,   
        createdBy:req.body.createdBy,
        modifiedBy:req.body.modifiedBy,
        modifiedOn:new Date()
    }
    let taxToEdit={
        query:{"_id":req.body._id},
        data:{"$set":TaxEdit}
        
    };
    // console.log(taxToEdit,"data")
    try{
        const editTax= await Tax.editTax(taxToEdit);
        res.send({"success":true,"code":200,"msg":"success","data":editTax});

    }
    catch(err){
        console.log(err,"erreo")
        res.send({"success":false, "code":"500", "msg":"failed","err":err});
    }
}
export default service;

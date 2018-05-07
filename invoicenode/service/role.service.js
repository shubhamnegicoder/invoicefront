/**
 * @file(Role.service.js) All service realted to asset
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 15-Jan-2018
 * @lastModifedBy Deepak
 */


import RoleConfig from '../models/role.model'
import logger from '../core/logger/app.logger'
import successMsg from '../core/message/success.msg'
import utility from '../core/utility.js'
import msg from '../core/message/error.msg'


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

    if(!req.query._id){
        return res.send({success:false, code:500, msg:"_id is missing"});
    }

	try{
        
        //let clientId = utility.removeQuotationMarks(req.query.clientId);

		let dataToFind = {
			query:{createdBy:req.query._id},
			projection:{}
		};

		// if(req.query.req.query._id){
		// 	dataToFind.projection = {
		// 		role:1,status:1,roleId:1
		// 	}
  //           dataToFind.query = {
  //               clientId:clientId
  //           }
		// }
        console.log(dataToFind)
		const Role = await RoleConfig.getAll(dataToFind);
        logger.info('sending all Role...');
		return res.send({"success":true, "code":200, "msg":successMsg.allRole, "data":Role});
	}catch(err){
		logger.error('Error in getting Role- ' + err);
		return res.send({"success":false, "code":500, "msg":msg.getRole, "err":err});

	}
}
/**
 * @description [calculation before update Device to db ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.editRole = async (req, res) => {
    
    if(req.body.roleId=='')
    {
        res.send({"success":false, "code":"500", "msg":msg.role});
    }

    // if(!req.body._id)
    // {
    //     res.send({"success":false, "code":"500", "msg":msg._id});
    // }
    let RoleToUpdate = {
        query:{roleId:req.body.roleId},

        data:{
            $set:{
                role: req.body.role,
                status: req.body.status || "Active",
                updatedAt: new Date()
            }
        }
    };
    try {
        const savedRole = await RoleConfig.editRole(RoleToUpdate);
        logger.info('Updating user type ...');
        res.send({"success":true, "code":"200", "msg":"role  update succesfully","data":savedRole});
    }
    catch(err) {
        logger.error('Error in updating Role- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.editRole,"err":err});
    }
}

/**
 * @description [calculation before add Device to db and after adding asset ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.addRole = async (req, res) => {
    if(!req.body._id)
    {
        return res.send({"success":false, "code":"500", "msg":"_id is missing"});
    }
    if(!req.body.role)
    {
        return res.send({"success":false, "code":"500", "msg":msg.Role});
    }
    // if(!req.body.module || !req.body.module.length)
    // {
    //     res.send({"success":false, "code":"500", "msg":"module is missing"});
    // }
    //let clientId = utility.removeQuotationMarks(req.body.clientId);
    var module = [];
    var mainObj = req.body;

    if(mainObj.Asset !== 'undefined' && mainObj.Asset !== undefined && mainObj.Asset !== ''){
        let permission = [] ;
        if(mainObj.AGET !== 'undefined' && mainObj.AGET !== undefined && mainObj.AGET !== ''){
            permission.push("GET")
        }
        if(mainObj.APOST !== 'undefined' && mainObj.APOST !== undefined && mainObj.APOST !== ''){
            permission.push("POST")
        }
        if(mainObj.APUT !== 'undefined' && mainObj.APUT !== undefined && mainObj.APUT !== ''){
            permission.push("PUT")
        }
        if(mainObj.ADELETE !== 'undefined' && mainObj.ADELETE !== undefined && mainObj.ADELETE !== ''){
            permission.push("DELETE")
        }
        
        module.push({
            name:"Asset",
            permission:permission
        })
    }
    if(mainObj.User !== 'undefined' && mainObj.User !== undefined && mainObj.User !== ''){
        let permission = [] ;
        if(mainObj.UGET !== 'undefined' && mainObj.UGET !== undefined && mainObj.UGET !== ''){
            permission.push("GET")
        }
        if(mainObj.UPOST !== 'undefined' && mainObj.UPOST !== undefined && mainObj.UPOST !== ''){
            permission.push("POST")
        }
        if(mainObj.UPUT !== 'undefined' && mainObj.UPUT !== undefined && mainObj.UPUT !== ''){
            permission.push("PUT")
        }
        if(mainObj.UDELETE !== 'undefined' && mainObj.UDELETE !== undefined && mainObj.UDELETE !== ''){
            permission.push("DELETE")
        }
        
        module.push({
            name:"User",
            permission:permission
        })
    }
    if(mainObj.Customer !== 'undefined' && mainObj.Customer !== undefined && mainObj.Customer !== ''){
        let permission = [] ;
        if(mainObj.CGET !== 'undefined' && mainObj.CGET !== undefined && mainObj.CGET !== ''){
            permission.push("GET")
        }
        if(mainObj.CPOST !== 'undefined' && mainObj.CPOST !== undefined && mainObj.CPOST !== ''){
            permission.push("POST")
        }
        if(mainObj.CPUT !== 'undefined' && mainObj.CPUT !== undefined && mainObj.CPUT !== ''){
            permission.push("PUT")
        }
        if(mainObj.CDELETE !== 'undefined' && mainObj.CDELETE !== undefined && mainObj.CDELETE !== ''){
            permission.push("DELETE")
        }
        
        module.push({
            name:"Customer",
            permission:permission
        })
    }
    if(mainObj.Device !== 'undefined' && mainObj.Device !== undefined && mainObj.Device !== ''){
        var permission = [] ;
        if(mainObj.DGET !== 'undefined' && mainObj.DGET !== undefined && mainObj.DGET !== ''){
            permission.push("GET")
        }
        if(mainObj.DPOST !== 'undefined' && mainObj.DPOST !== undefined &&mainObj.DPOST !== ''){
            permission.push("POST")
        }
        if(mainObj.DPUT !== 'undefined' && mainObj.DPUT !== undefined && mainObj.DPUT !== ''){
            permission.push("PUT")
        }
        if(mainObj.DDELETE !== 'undefined' && mainObj.DDELETE !== undefined && mainObj.DDELETE !== ''){
            permission.push("DELETE")
        }
        
        module.push({
            name:"Device",
            permission:permission
        })
    }

    let RoleToAdd = RoleConfig({
        createdBy : req.body._id,
        role: req.body.role,
        module:module,
        status: req.body.status || "Active",
        createAt: new Date()
    });
    try {
        const savedRole = await RoleConfig.addRole(RoleToAdd);
        logger.info('Adding user type ...');
        return res.send({"success":true, "code":"200", "msg":"user Type added successfully!!","data":savedRole});
    }
    catch(err) {
        logger.error('Error in adding Role- ' + err);
        return res.send({"success":false, "code":"500", "msg":msg.addRole,"err":err});
    }
}


/**
 * @description [calculation before delete Device to db and after delete Device]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
service.deleteRole = async (req, res) => {

    if(!req.body._id)
    {
        res.send({"success":false, "code":"500", "msg":msg._id});
    }
    let RoleToDelete = req.body._id;
    
    console.log(RoleToDelete);
    try{
        const removedRole = await RoleConfig.removedRole(RoleToDelete);
        logger.info('Deleted user type- ' + removedRole);
        res.send({"success":true, "code":"200", "msg":successMsg.deleteRole,"data":removedRole});
    }
    catch(err) {
        logger.error('Failed to delete Role- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.deleteRole,"err":err});
    }
}

// function common = (mainObj)=>{
//     var assetArray = [

//         "Asset",
//         "AGET",
//         "APUT",
//         "APOST",
//         "ADELETE"
//     ]
      
//     var userArray = [
//         "User",
//         "UGET",
//         "UPUT",
//         "UPOST",
//         "UDELETE"
//     ]
//     var customerArray =  [
//         "Customer",
//         "CGET",
//         "CPUT",
//         "CPOST",
//         "CDELETE"
//     ]
//     var deviceArray = [
//         "Device",
//         "DGET",
//         "DPUT",
//         "DPOST",
//         "DDELETE"
//     ]
//     // assetArray.forEach((obj)=>{
//     //     if(mainObj[obj] && obj== 'Asset'){
//     //         module.name = "Asset"
//     //     }else{
//     //         permission.push
//     //     }
//     // })
//     // userArray.forEach((obj)=>{
//     //     mainObj[obj]
//     // })
//     // customerArray.forEach((obj)=>{
//     //     mainObj[obj]
//     // })
//     // deviceArray.forEach((obj)=>{
//     //     mainObj[obj]
//     // })
    
//     }
// }
export default service;

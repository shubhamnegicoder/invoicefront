/**
 * @file(user.service.js) All service realted to user  
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 5-Feb-2018
 * @lastModifedBy Shakshi
 */

import User from '../models/user.model'
import roleConfig from '../models/role.model'
import Customer from '../models/customer.model'
import logger from '../core/logger/app.logger'
import successMsg from '../core/message/success.msg'
import msg from '../core/message/error.msg.js'
import utility from '../core/utility.js' 
import  crypto from 'crypto'
import jwt from 'jsonwebtoken'
import nm from 'nodemailer'
import rand from 'csprng'
import ObjectID from "bson-objectid";
import RoleConfig from '../models/role.model'


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
    //console.log("hiiiiii");
    if(!req.query._id){
       return res.send({"success":false,"code":"500","msg":"_id is missing"});
    }
    //let clientId = utility.removeQuotationMarks(req.query.clientId);
	try{
		let dataToFind = {
			query:{parentId:ObjectID(req.query._id)}
		};
		const users = await User.getAll(dataToFind);
        logger.info('sending all user...');
       
       var allCustomer;
    // if(users && users.length){
      
    //   for(var i=0; i<users.length; i++){
    //     console.log(i," = i")
    //      let CustomerToFind={
    //       _id:{$in:users[i].CustomerIds}
    //     }
    //     allCustomer = await Customer.allCustomer(CustomerToFind);
    //     console.log(allCustomer,"allCustomer")
    //     users[i].Customers = allCustomer;
    //   }
    //   console.log("hii")
    // }
		res.send({success:true, code:200, msg:successMsg.allUser, data:users});
	}catch(err){
		logger.error('Error in getting user- ' + err);
		res.send({success:false, code:500, msg:msg.getUser, err:err});
	}
}

/**
 * @description  [Get one user details from db]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description] 
 * @return {[type]}     [description]
 */
service.getOne=async(req,res)=>{
    let userToFind={
        _id:req.query._id
    }
    
    console.log(req.query.userId);
 
    try{
    
        const getOneUser=await User.getOne(userToFind);
        var allCustomer = [];
        if(getOneUser){
        let CustomerToFind={
          _id:{$in:getOneUser.CustomerIds}
        }
        allCustomer =await Customer.allCustomer(CustomerToFind);
     
     }
       
     logger.info('get one user-' +getOneUser);
     res.send({"success":true,"code":"200","msg":successMsg.getOneUser,"data":allCustomer});
 }
 catch(err){
     logger.error('Failed to get user- ' + err);
     res.send({"success":false, "code":"500", "msg":msg.getUser,"err":err});

 }

}





/**
 * @description [calculation before add user to db and after adding users ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addUser = async (req, res) => {
   if(!req.body._id || !req.body.roleId|| !req.body.name || !req.body.password || !req.body.emailId){
          return res.send({"success":false, "code":"500","msg":msg.param});
    }
    if(!req.body["customerIds[]"]){
        return res.send({"success":false, "code":"500","msg":"customerIds is missing"});
    }
    var temp =rand(100,30);
    var newPassword=temp+req.body.password;
    var token= crypto.createHash('sha512').update(req.body.password+rand).digest("hex");
    var hashed_password=crypto.createHash('sha512').update(newPassword).digest("hex");

    let userToAdd = User({
      parentId:req.body._id,
      token:token,
      salt:temp,
      temp_str:"",
      emailId: req.body.emailId,
      password: hashed_password,
      name: req.body.name,
      roleId: req.body.roleId,
      address:req.body.address,
      sector:req.body.sector,
      city:req.body.city,
      state:req.body.state,
      customerIds:req.body["customerIds[]"],
      country:req.body.country,
      module:req.body.module,
      mobile:req.body.mobile,
      status:req.body.status || "Active",
      createAt: new Date(),
      updatedAt: new Date()
    });
    try {
        
        const savedUser = await User.addUser(userToAdd);
        logger.info('Adding user...');
      //  console.log(savedUser);
        res.send({"success":true, "code":"200", "msg":successMsg.addUser,"data":savedUser});
    }
    catch(err) {
        logger.error('Error in getting User- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.addUser,"err":err});
    }
}

service.editUser = async(req,res)=>{
    if(!req.body._id){
        res.send({"success":false,"code":500,"msg":msg._id})
    }
    let userEdit={
        address:req.body.address,
        sector:req.body.sector,
        city:req.body.city,
        state:req.body.state,
        country:req.body.country,
        status:req.body.status,
        updatedAt: new Date()
    }
    let userToEdit={
        query:{"_id":req.body._id},
        data:{"$set":userEdit}
    };
    try{
        const editUser= await User.editUser(userToEdit);
        logger.info("update user");
        console.log("update user");
        res.send({"success":true,"code":200,"msg":successMsg.editUser,"data":editUser});

    }
    catch(err){
        logger.error('Error in getting user- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.editUser,"err":err});
    }
}

service.deleteUser = async (req, res) => {
    let userToDelete = req.body.userId;
    if(!req.body.userId){
        ({"success":false,"code":"500","msg":msg.userId });
    }
    try{
        const removedUser = await User.removeUser(userToDelete);
        logger.info('Deleted user-' + removedUser);
        res.send({"success":true, "code":"200", "msg":successMsg.deleteUser,"data":removedUser});
    }
    catch(err) {
        logger.error('Failed to delete User- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.deleteUser,"err":err});
    }
}

/**
 * @description [App login functionality]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

service.login = async (req, res) =>{

    try{
        if(!req.body.emailId){
            res.send({success:false, code:500, msg:msg.emailId});
        }
        if(!req.body.password){
            res.send({success:false, code:500, msg:msg.password})
        }
        const loggedUser = await User.login(req.body);
        console.log(loggedUser, "loggedUser")
        if(loggedUser.length !=0 )
        {   var temp=loggedUser.salt;
            var hash_db=loggedUser.password;
            var id=loggedUser.token;
            var userId=loggedUser.userId;
            var clientId=loggedUser.clientId;
            var name=loggedUser.name;
            var emailId=loggedUser.emailId;
            var newpass=temp+req.body.password;
            var hashed_password1=crypto.createHash('sha512').update(newpass).digest("hex");
            if(!loggedUser.module || !loggedUser.module.length){
                const loggedUserRole = await roleConfig.getOne({_id:loggedUser.roleId});
                loggedUser.module = loggedUserRole.module;
            }
            if(hash_db==hashed_password1)
            {
                res.send({success:true, code:200, msg:successMsg.loginUser, data:loggedUser });
            }
            else
            {
               res.send({"success":false,"code":"500","msg":"password does not match"})
            }

        }
        else
        {
            res.send({success:false, code:500, msg:"EmailId or password does not match"})
        }
    }catch(error){
      console.log("error == ",error)
        res.send({success:false, code:500, msg:msg.login, err:error})
    }
}

var smtpTransport=nm.createTransport(
    {
        service:'Gmail',
        auth:{
            user:"guptaswati21696@gmail.com",
            pass:"vyashimishtu@121"
        }
    }
);

service.forgetPassword= async(req,res)=>
{
       var temp=rand(24,24);
    try{
         const logUser=await User.forgetPassword(req.body);
        //  console.log(logUser);
         if(logUser.length!=0)
         {
            logUser[0].temp_str=temp
            console.log(logUser[0].temp_str);
        User.findOneAndUpdate({"emailId":req.body.emailId}, {$set:{temp_str:logUser[0].temp_str}}, {new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
          }

         console.log(doc);
        });
            var  mailOption = 
              {
                  from:"geniusguptaswati@gmail.com",
                  to:req.body.emailId,
                  subject:"reset password",
                  text:"Hello" + req.body.emailId +".Code to reset your Password is" +temp+".\n\nRegards,\nAdmin,\Thank You.",
               }
            smtpTransport.sendMail(mailOption,function(err,result)
           {
                if(err)
                {  console.log(err);
                   return res.send({"success":false,"code":"500","msg":"resetting password fail"});
                  
                }
                else
                return res.send({"success":true,"code":"200","msg":"Check your email and enter varification code"});
            })
        }
    }
    catch(err)
    {
         res.send({"success":false,"code":"500","msg":"Email does not exit!!",data:err})
    }
}

service.forgetPasswordReset=async (req,res)=>{
try{
       const logUser=await User.forgetPasswordReset(req.body);
       console.log(logUser);
       if(logUser.length!=0);
       {
          var temp = logUser[0].temp_str;
          console.log(temp);
          var temp2=rand(24,24);
          var new_pass= temp2 + req.body.npass;
          console.log(new_pass);
          var new_hashed_pass= crypto.createHash('sha512').update(new_pass).digest("hex");
          console.log(new_hashed_pass);
          console.log(req.body.code);
          if(temp==req.body.code){
              console.log("me aa gyi");
              User.findOneAndUpdate({"emailId":req.body.emailId},{$set:{password:new_hashed_pass,salt:temp2 ,temp_str:""}},{new:true}, function(err,result){
                  if(err)
                  {
                   return res.send({"success":false,"msg":"password not changed"});
                  }
                  else
                    return res.send({"success":true,"msg":"password changed succesfully"});
              })

          }
          else{
          res.send({"msg":"code not match"});
          }
       }
    }
    catch(err){
        res.send({"msg":"not valid emailid"});
    }
}
service.changePassword = async(req,res)=>{
    try{
        
        var temp1 = rand(160,36);
        // console.log(temp1);
        var newPass1= temp1 + req.body.newpass;
        // console.log(newPass1);
        var hashed_pass2 = crypto.createHash('sha512').update(newPass1).digest("hex");
        console.log(hashed_pass2);
         const changepass=await User.changePassword(req.body);
        //  console.log(changepass);
         if(changepass.length!=0)
         {
               var temp= changepass[0].salt;
               var hash_db=changepass[0].password;
               var newPass2=temp+ req.body.oldpass;
               var new_hashed_pass1=crypto.createHash('sha512').update(newPass2).digest("hex");
                if(hash_db==new_hashed_pass1)
                {
                    User.findOneAndUpdate({"emailId":req.body.emailId}, {$set:{password:hashed_pass2,salt:temp1}}, {new: true}, function(err, doc){
                        if(err)
                        {
                            return res.send({"success":false,"code":"500","msg":"old password not match"});
                        }
                        else
                        {
                            return res.send({"success":true,"code":"200","msg":" password changed successfully"});
                        }
                    })
                }
         }
         else
         {
           return  res.send({"success":false,"code":"500","msg":"emailId not exit!!"});
         }
    }
    catch(err)
    {
      res.send({"success":false,"code":"500","msg":"password changing fail"});

    }
}

service.updateCustomer = async (req,res) =>{
  var locations = {};
  if(!req.body.customerIds || !req.body.customerIds.length){
    if(!req.body.locations)
      return res.send({success:false, code:500, msg:"CustomerIds or locations is missing", })
    else{
      locations = {
        locations:req.body.locations
      }
    }
      
  }
  if(req.body.customerIds){
    locations = {
      customerIds:req.body.customerIds
    }
  }
  
  if(!req.body._id ){
    return res.send({success:false, code:500, msg:"_id is missing", })
  }
  var dataToUpdate1 = {
    query:{_id:req.body._id},
    data:{$set:
      locations
    }
  }
  try{
    var updatedUserCustomer =  await User.editUser(dataToUpdate1)
    return res.send({success:true, code:200, msg:"Successfully updated", data:updatedUserCustomer})
  }catch(error){
    console.log("error === ",error)
    return res.send({success:false, code:500, msg:"error in Customer updation", err:error})
  }
}
/**
 * @description [calculation before add superadmin to db  ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.RegisterSuperAdmin = async (detailsToReg) => {

    console.log("RegisterSuperAdmin called")
    var temp =rand(100,30);
    var newPassword=temp+detailsToReg.password;
    var token= crypto.createHash('sha512').update(detailsToReg.password+rand).digest("hex");
    var hashed_password=crypto.createHash('sha512').update(newPassword).digest("hex");
    
    
    
    var roleObj = RoleConfig({
        role: "SuperAdmin",
        module:detailsToReg.module,
        status:"Active"
    })
    
    try {
        
       
        const savedRole = await RoleConfig.addRole(roleObj);
        if(savedRole){
            let userToAdd = User({

              token:token,
              salt:temp,
              temp_str:"",
              emailId: detailsToReg.emailId,
              password: hashed_password,
              module: detailsToReg.module,
              status: "Active",
              roleId:ObjectID(savedRole._id),
              createAt: new Date(),
              updatedAt: new Date()
            });
            const savedUser = await User.addUser(userToAdd);
            console.log("savedUser == " ,savedUser);
        }
        
        logger.info('Register superAdmin...');
       
        
    }
    catch(err) {
        console.log("err == ",err);
        logger.error('Error in adding superadmin- ' + err);
        
    }
}
export default service;

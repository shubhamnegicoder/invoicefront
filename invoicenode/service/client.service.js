import Client from '../models/client.model';
import User from '../models/user.model';
import logger from '../core/logger/app.logger';
import successMsg from '../core/message/success.msg';
import msg from '../core/message/error.msg.js';
import utility from '../core/utility.js';

const service = {};

service.getAll = async (req,res) =>{
  if(!req.query.clientId){
       return res.send({"success":false,"code":"500","msg":msg.clientId});
    }
    let clientId = utility.removeQuotationMarks(req.query.clientId);
	try{
		let dataToFind = {
			query:{clientId:clientId}
		};
		const client = await Client.getAll(dataToFind);
    res.send({success:true, code:200, msg:successMsg.allClient, data:client});
	}catch(err){
		res.send({success:false, code:500, msg:msg.getClient, err:err});
	}
}

service.getOne=async(req,res)=>{
    let clientToFind={ clientId:req.query.clientId }
 try{
    const getOneClient = await Client.getOne(clientToFind);
    res.send({"success":true,"code":"200","msg":successMsg.getOneClient,"data":getOneClient});
 }
 catch(err){
    res.send({"success":false, "code":"500", "msg":msg.getClient,"err":err});
  }
}

service.addClient = async (req, res) => {
    let clientId = utility.removeQuotationMarks(req.body.clientId);
    let clientToAdd = Client({
          clientId: clientId,
	        clientName: req.body.name,
          email: req.body.emailId,
	        registrationNo: req.body.registrationNo,
          address: req.body.address,
          phone: req.body.phone,
	        status:req.body.status || "Active",
          state: req.body.state || "",
          createdAt: new Date(),
          updatedAt: new Date()
        });
    if(!req.body.clientId || !req.body.email){
      return res.send({"success":false, "code":"500","msg":msg.param});
    }
    try {
        const savedClient = await Client.addClient(clientToAdd);
        res.send({"success":true, "code":"200", "msg":successMsg.addClient,"data":savedClient});
    }
    catch(err) {
        res.send({"success":false, "code":"500", "msg":msg.addClient,"err":err});
    }
}

service.editClient = async(req,res)=>{
    if(!req.body._id){
        res.send({"success":false,"code":500,"msg":msg._id})
    }
    let clientEdit={
        status:req.body.status,
        updatedAt: new Date()
    }
    let clientToEdit={
        query:{"_id":req.body._id},
        data:{"$set":clientEdit}
    };
    try{
        const editClient= await Client.editClient(clientToEdit);
        res.send({"success":true,"code":200,"msg":successMsg.editClient,"data":editClient});
    } catch(err){
        res.send({"success":false, "code":"500", "msg":msg.editClient,"err":err});
    }
}

service.deleteClient = async (req, res) => {
    let clientToDelete = req.body.clientId;
    if(!req.body.clientId){
        res.send({"success":false,"code":"500","msg":msg.clientId });
    }
    try{
        const removedClient = await Client.removeClient(clientToDelete);
        res.send({"success":true, "code":"200", "msg":successMsg.deleteClient,"data":removedClient});
    }catch(err) {
        res.send({"success":false, "code":"500", "msg":msg.deleteClient,"err":err});
    }
}

export default service;

import Invoice from '../models/invoice.model';

import logger from '../core/logger/app.logger'
import successMsg from '../core/message/success.msg'
import msg from '../core/message/error.msg.js'
import utility from '../core/utility.js'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import nm from 'nodemailer'
import rand from 'csprng'
import ObjectId from 'bson-objectid';
import ObjectID from 'bson-objectid';

const service = {};
var today = new Date(),
 date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
service.addInvoice = async (req, res) => {
    console.log("req.body", req.body);
    let invoiceToAdd = Invoice({
        companyAddressLine1: req.body.companyAddressLine1,
        companyAddressLine2: req.body.companyAddressLine2,
        companyCode: req.body.companyCode,
        customerAddressLine1: req.body.customerAddressLine1,
        customerAddressLine2: req.body.customerAddressLine2,
        customerCode: req.body.customerCode,
        invoiceDate: req.body.invoiceDate,
        invoiceNumber: req.body.invoiceNumber,
        items: req.body.items,
        itemTotal: req.body.itemTotal,
        discountTotal: req.body.discountTotal,
        cgstTotal: req.body.cgstTotal,
        sgstTotal: req.body.sgstTotal,
        igstTotal: req.body.igstTotal,
        taxTotal: req.body.taxTotal,
        invoiceTotal: req.body.invoiceTotal,
        createdBy: req.body.id,
        status:"Invoiced"
    })
    console.log("invoiceToAdd", invoiceToAdd);
    try {
        const savedInvoice = await Invoice.addInvoice(invoiceToAdd);
        logger.info('Adding invoice...');
        res.send({ "success": true, "code": "200", "msg": successMsg.addInvoice, "data": savedInvoice });
    }
    catch (err) {
        console.log("catch");
        logger.error('Error in getting Invoice- ' + err);
        res.send({ "success": false, "code": "500", "msg": msg.addInvoice, "err": err });
    }
}

service.countInvoice = async (req, res) => {
   console.log(req.query,"query")

    try {
        let invoiceToCount = {
            query: { invoiceyear:req.query.year,invoicemonth:req.query.month,invoicedate:req.query.currentDate,companycode:req.query.companyCode,userid:ObjectID(req.query.id)},
        };

        const countInvoice = await Invoice.getCount(invoiceToCount);
        console.log(countInvoice,"invoice")
        logger.info('countinvoice...');
        res.send({ "success": true, "code": "200", "msg": "Successfully Found", "data": countInvoice });
    }

    catch (err) {
        console.log("catch");
        logger.error('Error in getting Invoice- ' + err);
        res.send({ "success": false, "code": "500", "msg": "not found invoicecount", "err": err });
    }
}

service.sales = async (req, res) => {
    console.log("this is sales service",req.query); 
   
    try {
        let invoiceSalesDate = {
            query: { invoiceyear: req.query.year, invoicemonth: req.query.month, invoicedate: req.query.currentDate, companycode: req.query.companyCode, userid: ObjectID(req.query.id) },

        };

        const invoiceSales = await Invoice.sales(invoiceSalesDate);
        console.log("invoiceSales", invoiceSales);
        res.send({ "success": true, "code": "200", "msg": "Successfully Found", "data": invoiceSales });
    }

    catch (err) {
        console.log("catch");
        res.send({ "success": false, "code": "500", "msg": "not found invoice sales", "err": err });
    }
}


service.topTenInvoice = async (req, res) => {
    console.log(req.query,"query")
    try {
        let topTen = {
            query: { invoiceyear: req.query.year, invoicemonth: req.query.month, invoicedate: req.query.currentDate, companycode: req.query.companyCode, userid: ObjectID(req.query.id) },

        };
           
        const topTenInvoice = await Invoice.topTenInvoice(topTen);
        console.log("topTenInvoice after model", topTenInvoice);
        res.send({ "success": true, "code": "200", "msg": "Successfully Found", "data": topTenInvoice });
    }
    catch (err) {
        console.log("catch");
        res.send({ "success": false, "code": "500", "msg": "Not found top ten invoices", "err": err });
    }
} 

service.getAllInvoice = async (req, res) => {
    console.log("req.query", req.query);
    let invoiceNumber = parseInt(req.query.invoiceNumber);
    console.log("invoiceNumber", invoiceNumber);
    try {
        var dataToFind = {}
        dataToFind = {
            query: {
                createdBy: ObjectId(req.query.id),
                invoiceNumber: invoiceNumber
            }
        }
        const invoice = await Invoice.allInvoice(dataToFind);
        logger.info('sending all invoice...');
        return res.send({ success: true, code: 200, msg: "listed ok", data: invoice });
    }
    catch (err) {
        logger.error('Error in getting invoice ' + err);
        return res.send({ success: false, code: 500, msg: "listed false", err: err });
    }
}
service.getAllList = async (req, res) => {
    try {
        let dataTo = {
            query:{createdBy:ObjectId(req.query.id)}
            
        };
        
        console.log(dataTo,"aaaaaa")
       
        const invoicedata = await Invoice.getAllList(dataTo);
        res.send({ success: true, code: 200, "msg": "success", data:invoicedata });
        
       
        // console.log(tax,"data");
    } catch (err) {
        // logger.error('Error in getting user- ' + err);
        // console.log(err);
        res.send({ success: false, code: 500, "msg": "error", err: err });
    }
}
service.editInvoice = async (req, res) => {
    console.log(req.body,"aaaasss")
   var invoiceToEdit;
    if (!req.body.id) {
        return res.send({ "success": false, "code": 500, "msg": "error" })
    }
    if(req.body.status){
        invoiceToEdit={
           query:{"_id":ObjectId(req.body.id)},
           data:{"$set":{status:req.body.status}}
       }
    }
    else{
   
      let InvoiceEdit = {
        companyAddressLine1: req.body.companyAddressLine1,
        companyAddressLine2: req.body.companyAddressLine1,
        companyCode: req.body.companyCode,
        customerAddressLine1: req.body.customerAddressLine1,
        customerAddressLine2: req.body.customerAddressLine2,
        customerCode: req.body.customerCode,
        invoiceDate: req.body.invoiceDate,
        invoiceNumber: req.body.invoiceNumber,
        items: req.body.items,
        itemTotal: req.body.itemTotal,
        discountTotal: req.body.discountTotal,
        cgstTotal: req.body.cgstTotal,
        sgstTotal: req.body.sgstTotal,
        igstTotal: req.body.igstTotal,
        taxTotal: req.body.taxTotal,
        invoiceTotal: req.body.invoiceTotal,
        modifiedBy: ObjectId(req.body.userId)
    }
     invoiceToEdit = {
        query: { "_id": ObjectId(req.body.id )},
        data: { "$set": InvoiceEdit }

    };
}
    console.log(invoiceToEdit ,"body")
  
    try {
        const editInvoice = await Invoice.editInvoice(invoiceToEdit);
          console.log(editInvoice,"data")
        res.send({ "success": true, "code": 200, "msg": "success", "data": editInvoice });

    }
    catch (err) {
        console.log(err, "erreo")
        res.send({ "success": false, "code": "500", "msg": "failllll", "err": err });
    }
}
service.getEditList=async (req,res)=>{
   
    let dataToedit={
        query:{"_id":ObjectId(req.query.id)}
    }
    console.log(dataToedit,"1111")
    try{
      

        const editdata = await Invoice.getEditList(dataToedit);
        console.log(editdata,"editdata")
        res.send({ success: true, code: 200, "msg": "success", data:editdata });
    }
    catch(err){
        res.send({ "success": false, "code": "500", "msg": "failu", "err": err });
    }
}

export default service;
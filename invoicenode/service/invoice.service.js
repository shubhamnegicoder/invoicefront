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
  var countDate = new Date();
    countDate.setHours(5);
    countDate.setMinutes(30);
    countDate.setSeconds(0);
    countDate.setMilliseconds(0);

    try {
        let invoiceToCount = {
            query: { invoiceDate: countDate },
        };

        const countInvoice = await Invoice.getCount(invoiceToCount);
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
    console.log("this is sales service"); 
    var salesDate = new Date();
    salesDate.setHours(5);
    salesDate.setMinutes(30);
    salesDate.setSeconds(0);
    salesDate.setMilliseconds(0);
   
    try {
        let invoiceSalesDate = {
            query: { invoiceDate: salesDate },
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
    console.log("topTenInvoice service");
    var topTenDate = new Date();
    topTenDate.setHours(5);
    topTenDate.setMinutes(30);
    topTenDate.setSeconds(0);
    topTenDate.setMilliseconds(0);
    console.log("date after changes is :", topTenDate);
    try {
        let topTen = {
            query: { invoiceDate: topTenDate },
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

export default service;
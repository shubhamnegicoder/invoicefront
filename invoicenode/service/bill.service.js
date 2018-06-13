import Bill from '../models/bill.model';

import logger from '../core/logger/app.logger'
import successMsg from '../core/message/success.msg'
import msg from '../core/message/error.msg.js'

import ObjectID from 'bson-objectid';

const service = {};

service.countBill = async (req, res) => {
    try {
        let billToCount = {
            query: {
                createdBy: ObjectID(req.query.id)
            },
        };
        const countBill = await Bill.getCount(billToCount);
        logger.info('counting bill ...');
        res.send({ "success": true, "code": "200", "msg": "Successfully Found", "data": countBill });
    }
    catch (err) {
        logger.error('Error in getting Bill - ' + err);
        res.send({ "success": false, "code": "500", "msg": "not found bill count", "err": err });
    }
}

service.addBill = async (req, res) => {
    let billToAdd = Bill({
        billDate: req.body.billDate,
        billNumber: req.body.billNumber,
        companyName: req.body.companyName,
        companyCode: req.body.companyCode,
        companyAddressLine1: req.body.companyAddressLine1,
        companyAddressLine2: req.body.companyAddressLine2,
        customerName: req.body.customerName,
        customerCode: req.body.customerCode,
        customerAddressLine1: req.body.customerAddressLine1,
        customerAddressLine2: req.body.customerAddressLine2,
        items: req.body.items,
        subTotal: req.body.subTotal,
        discountTotal: req.body.discountTotal,
        billTotal: req.body.billTotal,
        createdBy: req.body.id,
        status: req.body.status
    });
    try {
        const savedBill = await Bill.addBill(billToAdd);

        logger.info('Adding bill ...');
        res.send({ "success": true, "code": "200", "msg": successMsg.addBill, "data": savedBill });
    }
    catch (err) {
        logger.error('Error in getting Bill - ' + err);
        res.send({ "success": false, "code": "500", "msg": msg.addBill, "err": err });
    }
}

service.getAllBill = async (req, res) => {
    let billNumber = parseInt(req.query.billNumber);
    console.log("billNumber", billNumber);
    try {
        var dataToFind = {}
        dataToFind = {
            query: {
                billNumber: billNumber
            }
        }
        console.log("dataToFind", dataToFind);
        const bill = await Bill.allBill(dataToFind);
        console.log("bill", bill);
        logger.info('sending all bills ...');
        return res.send({ success: true, code: 200, msg: "listed ok", data: bill });
    }
    catch (err) {
        logger.error('Error in getting bills ' + err);
        return res.send({ success: false, code: 500, msg: "listed false", err: err });
    }
}

service.getAllList = async (req, res) => {
    try {
        let dataTo = {
            query: { createdBy: ObjectID(req.query.id) }

        };


        const billdata = await Bill.getAllList(dataTo);
        res.send({ success: true, code: 200, "msg": "success", data: billdata });


        // console.log(tax,"data");
    } catch (err) {
        // logger.error('Error in getting user- ' + err);
        // console.log(err);
        res.send({ success: false, code: 500, "msg": "error", err: err });
    }
}

service.searchBill = async (req, res) => {

    try {

        let query = {}

        if (req.query.billNumber !== undefined && req.query.billNumber !== "") {
            query.billNumber = parseInt(req.query.billNumber)}
        if (req.query.companyName !== '') {
            query.companyName = { $regex: '.*' + req.query.companyName + '.*' }
        }
        if (req.query.customerName !== '') {
            query.customerName = { $regex: '.*' + req.query.customerName + '.*' }
        }
        if (req.query.startDate !== '' && req.query.endDate !== '') {
            query.billDate = { "$gte": new Date(req.query.startDate), "$lte": new Date(req.query.endDate) }
        }
        else if(req.query.startDate!=='')
        {
            query.billDate=new Date(req.query.startDate);
        }
        var oneBill = await Bill.searchBill(query);
        console.log(oneBill,"lllllllllllll000llll")
        return res.send({ success: true, code: 200, msg: "Successfully found", data: oneBill });
    }
     catch (error)
      {
        return res.send({ success: false, code: 500, msg: "Error in getting Customer" + error, err: error })
      }
}

export default service;
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
        const billInvoice = await Bill.getCount(billToCount);
        logger.info('counting bill ...');
        res.send({ "success": true, "code": "200", "msg": "Successfully Found", "data": billInvoice });
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
        invoiceTotal: req.body.invoiceTotal,
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

export default service;
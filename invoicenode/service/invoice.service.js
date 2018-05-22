import Invoice from '../models/invoice.model';

import logger from '../core/logger/app.logger'
import successMsg from '../core/message/success.msg'
import msg from '../core/message/error.msg.js'
import utility from '../core/utility.js'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import nm from 'nodemailer'
import rand from 'csprng'

const service = {};

service.addInvoice = async (req, res) => {
    let invoiceToAdd = Invoice({
        itemData: req.body.item
    });
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
let invoiceToCount={
    query:{createdBy:ObjectID(req.query.id)},
    projection:{}
};

try {
    const countInvoice = await Invoice.getCount(invoiceToCount);
    logger.info('countinvoice...');
    res.send({ "success": true, "code": "200", "msg": successMsg.addInvoice, "data": countInvoice });
}
catch (err) {
    console.log("catch");
    logger.error('Error in getting Invoice- ' + err);
    res.send({ "success": false, "code": "500", "msg": "not found invoicecount", "err": err });
}
}
service.getAllInvoice = async (req, res) => {
    try {
        var queryToFindCity = {}
            queryToFindCity = {
                query: {}
            }
        const invoice = await City.allInvoice(dataToFind);
        logger.info('sending all invoice...');
        return res.send({ success: true, code: 200, msg:"listed ok", data: invoice });
         } catch (err)
         {
        logger.error('Error in getting invoice ' + err);
        return res.send({ success: false, code: 500, msg: "listed false", err: err });

       }
}

export default service;
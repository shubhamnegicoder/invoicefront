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
        item: req.body.item,
        qty: req.body.qty,
        price: req.body.price,
        total: req.body.total
    });
    try {
        if (!req.body.item || !req.body.qty || !req.body.price || !req.body.total) {
            return res.send({ "success": false, "code": "500", "msg": msg.param });
        }
        const savedInvoice = await Invoice.addInvoice(invoiceToAdd);
        logger.info('Adding invoice...');
        res.send({ "success": true, "code": "200", "msg": successMsg.addInvoice, "data": savedInvoice });
    }
    catch (err) {
        logger.error('Error in getting Invoice- ' + err);
        res.send({ "success": false, "code": "500", "msg": msg.addInvoice, "err": err });
    }
}

export default service;
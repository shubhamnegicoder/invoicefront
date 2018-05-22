/**
 * @file(user.service.js) All service realted to user  
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 5-Feb-2018
 * @lastModifedBy Shakshi
 */

import ObjectID from "bson-objectid";
import Product from '../models/product.model'


/**
 * [service is a object ]
 * @type {Object}
 */

const service = {};

service.getAll = async (req, res) => {
    try {
        let dataToFind = {
        	query:{parentId:ObjectID(req.query.id)}
        };
        const product = await Product.getAll();
        res.send({ success: true, code: 200, "msg": "success", data: product });
        // console.log(tax,"data");
    } catch (err) {
        // logger.error('Error in getting user- ' + err);
        // console.log(err);
        res.send({ success: false, code: 500, "msg": "error", err: err });
    }
}






/**
 * @description [calculation before add user to db and after adding users ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addProduct = async (req, res) => {
    console.log(req.body, "hi")
    // console.log(req.body.cgst.length)
     
    // if (!req.body.productCode || !req.body.productName || !req.body.taxCode || !req.body.rate) {
    //     return res.send({ "success": false, "code": 500, "msg": "error" });
    // }
 
    let productToAdd = Product({

        productCode: req.body.productCode,
        productName: req.body.productName,
        taxCode: req.body.taxCode,
        rate: req.body.rate,
        isActive: req.body.isActive,
        createdBy: req.body.id,
        modifiedOn:new Date()
    });



    try {

        const savedProduct = await Product.addProduct(productToAdd);
        // console.log("isactive" + req)
        // logger.info('Adding tax...');
        //  console.log("savedproduct" + savedProduct);
        res.send({ "success": true, "code": "200", "msg": "success", "data": savedProduct });
    }
    catch (err) {
        // logger.error('Error in getting User- ' + err);
        console.log(err)
        res.send({ "success": false, "code": "500", "msg": "errorr", "err": err });
    }
}

service.editProduct = async (req, res) => {
    if (!req.body._id) {
      return res.send({ "success": false, "code": 500, "msg": "error" })
    }
    let ProductEdit = {
        productName: req.body.productName,
        taxCode: req.body.taxCode,
        rate: req.body.rate,
        isActive: req.body.isActive,
        modifiedBy: req.body.userId,
        modifiedOn: new Date()
    }
    let productToEdit = {
        query: { "_id": req.body._id },
        data: { "$set": ProductEdit }

    };
    // console.log(taxToEdit,"data")
    try {
        const editProduct = await Product.editProduct(productToEdit);
        res.send({ "success": true, "code": 200, "msg": "success", "data": editProduct });

    }
    catch (err) {
        console.log(err, "erreo")
        res.send({ "success": false, "code": "500", "msg": "failed", "err": err });
    }
}
export default service;

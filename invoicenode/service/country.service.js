

import Country from '../models/country.model'
import logger from '../core/logger/app.logger'
import msg from '../core/message/error.msg.js'
import successMsg from '../core/message/success.msg'
import utility from '../core/utility.js'
import ObjectID from "bson-objectid";




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
// service.getAll = async (req, res) => {
//     var location = {};
//     if (!req.query.id) {
//         return res.send({ "success": false, "code": "500", "msg": "countryId is missing" });
//     }
//     // if (req.query.location) {
//     //     location = req.query.location;
//     // }

//     //let clientId = utility.removeQuotationMarks(req.query.clientId);
//     try {
//          // console.log(dataToFind);
//         const country = await Country.getAll(dataToFind);
//         logger.info('sending all country...');
//         return res.send({ success: true, code: 200, msg: "succsess", data:country });
//     } catch (err) {
//         logger.error('Error in getting country- ' + err);
//         return res.send({ success: false, code: 500, msg: "error", err: err });

//     }
// }

/**
 * @description get all asset that is not associated with device
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.getAllCountry = async (req, res) => {
    console.log("req", req.query)
    var location = {};
    // if (!req.query.id) {
    //     return res.send({ "success": false, "code": "500", "msg": "_id is missing" });
    // }

    try {
       
        var queryToFindCountry = {}
        queryToFindCountry = {
            query: { createdBy: ObjectID(req.query.id) }
        }


        // console.log(dataToFind);
        const country = await Country.allCountry(queryToFindCountry);
        console.log(country,"aaaoooooooooooooo")
        logger.info('sending all country...');
        return res.send({ success: true, code: 200, msg: "listed ok", data: country });
    } catch (err) {
        logger.error('Error in getting country- ' + err);
        return res.send({ success: false, code: 500, msg: "listed false", err: err });

    }
}
/**
 * @description [calculation before add Device to db and after adding asset ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addCountry = async (req, res) => {
    if (!req.body.countryCode || !req.body.countryName) {
        return res.send({ "success": false, "code": "500", "msg": msg.param });
    }
    
    let countryToAdd = Country({
        countryCode: req.body.countryCode,
        countryName: req.body.countryName,
        createdBy: req.body.id,
        isActive: req.body.isActive,
        createAt: new Date()
    });

    try {
        console.log(countryToAdd, "country")
        const savedCountry = await Country.addCountry(countryToAdd);
        logger.info('Adding Country...');
        return res.send({ "success": true, "code": "200", "msg": "country added successfully", "data": savedCountry });
    }
    catch (err) {
        // logger.error('Error in getting Asset- ' + err);
        return res.send({ "success": false, "code": "500", "msg": "unable to add country", "err": err });
    }
}


/**
 * @description [calculation before edit Device to db and after edit Device]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
service.editCountry = async (req, res) => {
    console.log(req.body, "editttttttttttt in country")
    let countryToEdit = {
        countryName: req.body.countryName,
        modifiedBy: req.body.userId,
        isActive: req.body.isActive,
        updatedAt: new Date()
    };
    let countryEdit = {
        query: { "_id": req.body.id },
        data: { "$set": countryToEdit }
    };
    try {
        const editedCountry = await Country.editCountry(countryEdit);
        logger.info('edit country');
        // console.log('Adding asset...');
        return res.send({ "success": true, "code": "200", "msg": "country edited", "data": editedCountry });
    } catch (err) {
        logger.error('Error in getting Country- ' + err);
        return res.send({ "success": false, "code": "500", "msg": "unable to edit country", "err": err });
    }
}



/**
 * @description [calculation before delete Device to db and after delete Device]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
// service.deleteAsset = async (req, res) => {
//     let assetToDelete = req.body.assetId;
//     if (!req.body.assetId) {
//         return res.send({ "success": false, "code": "500", "msg": msg.assetId });
//     }
//     try {
//         const removedAsset = await Asset.removeAsset(assetToDelete);
//         logger.info('Deleted asset- ' + removedAsset);
//         return res.send({ "success": true, "code": "200", "msg": successMsg.deleteAsset, "data": removedAsset });
//     }
//     catch (err) {
//         logger.error('Failed to delete Asset- ' + err);
//         return res.send({ "success": false, "code": "500", "msg": msg.deleteAsset, "err": err });
//     }
// }

/** 
* @description [with all the calculation before getOne function of model and after getAll]
* @param  {[type]}
* @param  {[type]}
* @return {[type]}
*/
// service.getOne = async (req, res) => {

//     let assetToFind = {
//         assetId: req.query.assetId
//     }
//     try {
//         const getOneAsset = await Asset.getOne(assetToFind);
//         logger.info('get one asset-' + getOneAsset);
//         return res.send({ "success": true, "code": "200", "msg": successMsg.allAsset, "data": getOneAsset });
//     }
//     catch (err) {
//         logger.error('Failed to get Asset- ' + err);
//         return res.send({ "success": false, "code": "500", "msg": msg.getAsset, "err": err });

//     }
// }

export default service;

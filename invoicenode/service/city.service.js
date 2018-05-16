

import City from '../models/city.model'
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
 * @description get all asset that is not associated with device
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.getAllCity = async (req, res) => {
    console.log(req.query,"allllllllllllllllllllllllllllllllll")
    if (!req.query._id) {
        return res.send({ "success": false, "code": "500", "msg": "_id is missing" });
    }

    try {
       
        var queryToFindCity = {}
            queryToFindCity = {
                query: {createdBy:ObjectID(req.query._id) }
            }
        

        // console.log(dataToFind);
        const city = await City.allCity(queryToFindCity);
        logger.info('sending all city...');
        return res.send({ success: true, code: 200, msg:"listed ok", data: city });
    } catch (err) {
        logger.error('Error in getting city- ' + err);
        return res.send({ success: false, code: 500, msg: "listed false", err: err });

    }
}



service.getAllSelectedCity = async (req, res) => {
  
    if (!req.query.stateCode) {
        return res.send({ "success": false, "code": "500", "msg": "stateCode is missing" });
    }

    try {

        var queryToFindState = {}
        queryToFindState = {
            query: {stateCode:req.query.stateCode}
        }


        // console.log(dataToFind);
        const city = await City.allSelectedCity(queryToFindState);
        logger.info('sending all selecteds city...');
        return res.send({ success: true, code: 200, msg: "listed ok", data: city });
    } catch (err) {
        logger.error('Error in getting state- ' + err);
        return res.send({ success: false, code: 500, msg: "listed false", err: err });

    }
}
/**
 * @description [calculation before add Device to db and after adding asset ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addCity = async (req, res) => {
    console.log(req.body,"add citydata back")
   
    if (!req.body.cityCode || !req.body.cityName) {
       return res.send({ "success": false, "code": "500", "msg": msg.param });
    }

    //let clientId = utility.removeQuotationMarks(req.body.clientId);
    let cityToAdd = City({
        countryCode:req.body.countryCode,
        stateCode:req.body.stateCode,
        cityCode: req.body.cityCode,
        cityName: req.body.cityName,
        createdBy: req.body.id,
        createAt: new Date()
    });

    try {
        // console.log(cityToAdd,"jayega")
        const savedCity = await City.addCity(cityToAdd);
        // console.log(savedCity,"save kyo nhi hua")
        logger.info('Adding city...');
        return res.send({ "success": true, "code": "200", "msg":"city added successfully" , "data": savedCity });
    }
    catch (err) {
        // logger.error('Error in getting Asset- ' + err);
        return res.send({ "success": false, "code": "500", "msg": "unable to add city", "err": err });
    }
}


/**
 * @description [calculation before edit Device to db and after edit Device]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
service.editCity = async (req, res) => {
    let cityToEdit = {
        cityCode: req.body.cityCode,
        cityName: req.body.cityName
    };
    let cityEdit = {
        query:{ "_id": req.body._id },
        data: { "$set": cityToEdit }
    };
    try {
        const editedCity = await City.editCity(cityEdit);
        logger.info('Edit city...');
        // console.log('Adding asset...');
        return res.send({ "success": true, "code": "200", "msg":"country edited", "data": editedCity });
    } catch (err) {
        logger.error('Error in getting Asset- ' + err);
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

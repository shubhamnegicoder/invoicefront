

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
    if (!req.query.id) {
        return res.send({ "success": false, "code": "500", "msg": "id is missing" });
    }

    try {
        var queryToFindCity = {}
            queryToFindCity = {
                query: {createdBy:ObjectID(req.query.id) }
            }
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
        isActive: req.body.isActive,
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
        cityName: req.body.cityName,
        modifiedBy: req.body.userId,
        isActive: req.body.isActive,
        updatedAt: new Date()
    };
    let cityEdit = {
        query:{ "_id": req.body.id },
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






export default service;

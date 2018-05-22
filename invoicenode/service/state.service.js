

import State from '../models/state.model'
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
service.getAllState = async (req, res) => {
  

    try {
        var queryToFindState = {}
            queryToFindState = {
                query: {createdBy:ObjectID(req.query.id)}
            }

        // console.log(dataToFind);
        const state = await State.allState(queryToFindState);
        logger.info('sending all state...');
        return res.send({ success: true, code: 200, msg:"listed ok", data: state });
    } catch (err) {
        logger.error('Error in getting state- ' + err);
        return res.send({ success: false, code: 500, msg: "listed false", err: err });

    }
}

service.getAllSelectedState = async (req, res) => {
   
    if (!req.query.countryCode) {
        return res.send({ "success": false, "code": "500", "msg": "countryCode is missing" });
    }

    try {

        var queryToFindState = {}
        queryToFindState = {
            query: { countryCode:req.query.countryCode }
        }


        // console.log(dataToFind);
        const state = await State.allSelectedState(queryToFindState);
        logger.info('sending all selecteds state...');
        return res.send({ success: true, code: 200, msg: "listed ok", data: state });
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
service.addState = async (req, res) => {
    console.log(req.body,"add k liye k liye ")
    if (!req.body.stateCode || !req.body.stateName) {
       return res.send({ "success": false, "code": "500", "msg": msg.param });
    }

    //let clientId = utility.removeQuotationMarks(req.body.clientId);
    let stateToAdd = State({
        countryCode:req.body.countryCode,
        stateCode: req.body.stateCode,
        stateName: req.body.stateName,
        createdBy: req.body.id,
        isActive: req.body.isActive,
        createAt: new Date()
    });

    try {

        const savedCountry = await State.addState(stateToAdd);
        logger.info('Adding state...');
        return res.send({ "success": true, "code": "200", "msg":"state added successfully" , "data": savedCountry });
    }
    catch (err) {
        // logger.error('Error in getting Asset- ' + err);
        return res.send({ "success": false, "code": "500", "msg": "unable to add state", "err": err });
    }
}


/**
 * @description [calculation before edit Device to db and after edit Device]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
service.editState = async (req, res) => {
    // console.log(req.body, "editttttttttttt in state")
    let stateToEdit = {
        stateName: req.body.stateName,
        modifiedBy: req.body.userId,
        isActive: req.body.isActive,
        updatedAt: new Date()
    };
    let stateEdit = {
        query:{ "_id": req.body.id },
        data: { "$set": stateToEdit }
    };
    try {
        const editedState = await State.editState(stateEdit);
        logger.info('Edit state...');
        // console.log('Adding asset...');
        return res.send({ "success": true, "code": "200", "msg":"country edited", "data": editedState });
    } catch (err) {
        logger.error('Error in getting Asset- ' + err);
        return res.send({ "success": false, "code": "500", "msg": "unable to edit country", "err": err });
    }
}





/** 
* @description [with all the calculation before getOne function of model and after getAll]
* @param  {[type]}
* @param  {[type]}
* @return {[type]}
*/

export default service;

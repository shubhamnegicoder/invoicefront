/**
 * @file(Customer.model.js) With Schema for Customer model and all the db query function
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 8-Feb-2018
 * @lastModifedBy Shakshi
 */

import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";

/**
 * [CustomerSchema is used for Customer data validating aginst schema]
 * @type {[type]}
 */
const CustomerSchema = mongoose.Schema({
    customerName:{type:String},
    alert: {
      email: { type: Boolean, default: false },
      sms: { type: Boolean, default: false },
      notification: { type: Boolean, default: false }
    },
    status:{type: String },
    createdBy:{type:String},
    createdAt:{type: Date},
    updatedAt:{type: Date}
}, {collection : 'customer'});

let CustomerModel = mongoose.model('customer', CustomerSchema);

/**
 * @description [add one device to db]
 * @param  {object}
 * @return {[object]}
 */
CustomerModel.addCustomer = (CustomerToAdd) => {
    return CustomerToAdd.save();
}
CustomerModel.allCustomer = (query) =>{
    return CustomerModel.find(query);
}
CustomerModel.editCustomer = (objToUpdate) =>{
    return CustomerModel.update(objToUpdate.query,objToUpdate.data);
}
CustomerModel.getCount = (userToCount)=>{

    return CustomerModel.find(userToCount.query).count();
}
export default CustomerModel;

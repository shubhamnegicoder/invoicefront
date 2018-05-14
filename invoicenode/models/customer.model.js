/**
 * @file(Customer.model.js) With Schema for Customer model and all the db query function
 * @author Purti Singh <purti.singh@limitlessmobil.com>
 * @version 1.0.0
 * @lastModifed 03-May-2018
 * @lastModifedBy Purti
 */

import mongoose from 'mongoose';

/**
 * [CustomerSchema is used for Customer data validating aginst schema]
 * @type {[type]}
 */
const CustomerSchema = mongoose.Schema({
    customerName:{type:String},
    customerCode:{type:String},
    customerGSTNo:{type:String},
    addressLine1:{type:String},
    addressLine2:{type:String},
    city:{type:String},
    state:{type:String},
    country:{type:String},
    postalCode:{type:Number},
    contactNo:{type:String},
    status:{type: String },
    createdBy:{type:mongoose.Schema.ObjectId},
    modifiedBy:{type: mongoose.Schema.ObjectId},
    modifiedOn:{type: Date}
}, {collection : 'customer'});

let CustomerModel = mongoose.model('customer', CustomerSchema);
 
CustomerModel.allCustomer = () =>{
    return CustomerModel.find();
}

CustomerModel.addCustomer = (addToCustomer) =>{
    return addToCustomer.save();
}

CustomerModel.editCustomer = (addToCustomer) =>{
    		console.log("_id",addToCustomer.data);
    return CustomerModel.update(addToCustomer.query,addToCustomer.data);
}
export default CustomerModel;
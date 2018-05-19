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
    customerCode:{type:String,index:{unique:true,dropDups: true}},
    customerGSTNo:{type:String},
    addressLine1:{type:String},
    addressLine2:{type:String},
    cityCode:{type:String},
    stateCode:{type:String},
    countryCode:{type:String},
    postalCode:{type:Number},
    contactNo:{type:String},
    createdBy:{type:mongoose.Schema.ObjectId},
    modifiedBy:{type: mongoose.Schema.ObjectId},
    createAt:{type:Date},
    updatedAt:{type: Date},
    isActive:{type:Boolean}
}, {collection : 'customer'});

let CustomerModel = mongoose.model('customer', CustomerSchema);
 
CustomerModel.allCustomer = () =>{
    // return CustomerModel.find();
    return CustomerModel.aggregate([
        { $match: {} },
        {
            $lookup: {
                from: "country",
                localField: "countryCode",
                foreignField: "countryCode",
                as: "country_docs"
            }

        },
        {
            $unwind: "$country_docs"
        },
        {
            $lookup: {
                from: "state",
                localField: "stateCode",
                foreignField: "stateCode",
                as: "state_docs"
            }


        },
        {
            $unwind: "$state_docs"
        }, 
        {
            $lookup: {
                from: "city",
                localField: "cityCode",
                foreignField: "cityCode",
                as: "city_docs"
            }


        },
        {
            $unwind: "$city_docs"
        }, 
        
        {
            $project: {
                customerName:1,
                customerCode:1,
                customerGSTNo:1,
                addressLine1:1,
                addressLine2:1,
                status:1,
                cityCode:1,
                cityName:"$city_docs.cityName",
                stateCode:1,
                stateName:"$state_docs.stateName",
                countryCode:1,
                countryName:"$country_docs.countryName",
                postalCode:1,
                contactNo:1,

            }
        }
    ]);
    // return CustomerModel.find();
}

CustomerModel.oneCustomer = (dataToFind) =>{
    return CustomerModel.findOne(dataToFind.query);
}


CustomerModel.addCustomer = (addToCustomer) =>{
    return addToCustomer.save();
}

CustomerModel.editCustomer = (addToCustomer) =>{
    		console.log("_id",addToCustomer.data);
    return CustomerModel.update(addToCustomer.query,addToCustomer.data);
}
export default CustomerModel;
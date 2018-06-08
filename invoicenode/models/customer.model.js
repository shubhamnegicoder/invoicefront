/**
 * @file(Customer.model.js) With Schema for Customer model and all the db query function
 * @author Purti Singh <purti.singh@limitlessmobil.com>
 * @version 1.0.0
 * @lastModifed 03-May-2018
 * @lastModifedBy Purti 
 */

import mongoose from 'mongoose';
var ObjectID = require("mongodb").ObjectID;
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
 
CustomerModel.allCustomer = (allCustomer) =>{ 
    // return CustomerModel.find();
    return CustomerModel.aggregate([
        { $match: {createdBy:allCustomer.query.createdBy} },
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
                cityCode:1,
                cityName:"$city_docs.cityName",
                stateCode:1,
                stateName:"$state_docs.stateName",
                countryCode:1,
                countryName:"$country_docs.countryName",
                postalCode:1,
                contactNo:1,
                isActive:1

            }
        }
    ]);
    // return CustomerModel.find();
}

CustomerModel.oneCustomer = (dataToFind) =>{
    //console.log("dataToFind---"+dataToFind);
    var cid=new ObjectID(dataToFind.query._id);
    //console.log("cid---"+cid);
    return CustomerModel.aggregate([
        { $match: {"_id":cid} },
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
                cityCode:1,
                cityName:"$city_docs.cityName",
                stateCode:1,
                stateName:"$state_docs.stateName",
                countryCode:1,
                countryName:"$country_docs.countryName",
                postalCode:1,
                contactNo:1,
                isActive:1

            }
        }
    ]);
    //return CustomerModel.findOne(dataToFind.query);
}
CustomerModel.searchCustomer = (query) =>{
    // console.log(dataToFind.query,"sssssssssssssssssssssssssss")
    return CustomerModel.aggregate([
        {$match:{$and:[query]}},
        //  { $match: {$or:[{customerCode:dataToFind.query.customerCode},{countryCode:dataToFind.query.countryCode},{stateCode:dataToFind.query.stateCode},{cityCode:dataToFind.query.cityCode}]}},
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
                cityCode:1,
                cityName:"$city_docs.cityName",
                stateCode:1,
                stateName:"$state_docs.stateName",
                countryCode:1,
                countryName:"$country_docs.countryName",
                postalCode:1,
                contactNo:1,
                isActive:1

            }
        }
    ]);
}

CustomerModel.addCustomer = (addToCustomer) =>{
    return addToCustomer.save();
}


CustomerModel.editCustomer = (addToCustomer) =>{
    return CustomerModel.update(addToCustomer.query,addToCustomer.data);
}
CustomerModel.getOneCustomer=(oneCustomer)=>{
    return CustomerModel.find(oneCustomer.query);
}
export default CustomerModel;
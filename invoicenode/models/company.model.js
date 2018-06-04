/**
 * @file(Company.model.js) With Schema for Customer model and all the db query function
 * @author Purti Singh <purti.singh@limitlessmobil.com>
 * @version 1.0.0
 * @lastModifed 11-May-2018
 * @lastModifedBy Purti
 */
import mongoose from 'mongoose';
var ObjectID = require("mongodb").ObjectID;
/**
 * [CompanySchema is used for Company data validating aginst schema]
 * @type {[type]}
 */
const CompanySchema = mongoose.Schema({ 
    file: { data: Buffer, contentType: String },
    companyName:{type:String,index: {unique:true,dropDups: true}},
    companyCode:{type:String, index: {unique:true,dropDups: true}},
    companyGSTNo:{type:String},
    logo:{type:String},
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
}, {collection : 'company'});

let CompanyModel = mongoose.model('company', CompanySchema);

CompanyModel.allCompany = (queryToFindCompany) =>{ 
    let createdBy = queryToFindCompany.query.createdBy;
    return CompanyModel.aggregate([
        { $match: {createdBy:createdBy} },
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
                file:1,
                companyName:1,
                companyCode:1,
                companyGSTNo:1,
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
 
CompanyModel.oneCompany = (dataToFind) =>{
    var cid=new ObjectID(dataToFind.query._id);
    return CompanyModel.aggregate([
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
                file:1,
                logo:1,
                companyName:1,
                companyCode:1,
                companyGSTNo:1, 
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
CompanyModel.searchCompany = (query) =>{
    console.log(query,"sssssssssssssssssssssssssss")
    return CompanyModel.aggregate([
        {$match:{$and:[query]}},
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
                file:1,
                logo:1,
                companyName:1,
                companyCode:1,
                companyGSTNo:1, 
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
   
CompanyModel.addCompany = (addToCompany) =>{
    return addToCompany.save();
}

CompanyModel.editCompany = (editToCompany) =>{
    return CompanyModel.update(editToCompany.query,editToCompany.data);
}

CompanyModel.getOneCompany=(oneCompany)=>{
    return CompanyModel.find(oneCompany.query)
}

CompanyModel.removeLogo=(removeCompany)=>{
    return CompanyModel.update(removeCompany.query,removeCompany.data);
}


export default CompanyModel;
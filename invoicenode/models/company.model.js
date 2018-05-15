/**
 * @file(Company.model.js) With Schema for Customer model and all the db query function
 * @author Purti Singh <purti.singh@limitlessmobil.com>
 * @version 1.0.0
 * @lastModifed 11-May-2018
 * @lastModifedBy Purti
 */
import mongoose from 'mongoose';

/**
 * [CompanySchema is used for Company data validating aginst schema]
 * @type {[type]}
 */
const CompanySchema = mongoose.Schema({
    companyName:{type:String},
    companyCode:{type:String, index: {unique:true,dropDups: true}},
    companyGSTNo:{type:String},
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
}, {collection : 'company'});

let CompanyModel = mongoose.model('company', CompanySchema);
 
CompanyModel.allCompany = () =>{
    return CompanyModel.find();
}

CompanyModel.oneCompany = (dataToFind) =>{
    return CompanyModel.findOne(dataToFind.query);
}

CompanyModel.addCompany = (addToCompany) =>{
    return addToCompany.save();
}

CompanyModel.editCompany = (editToCompany) =>{
return CompanyModel.update(editToCompany.query,editToCompany.data);
}

export default CompanyModel;
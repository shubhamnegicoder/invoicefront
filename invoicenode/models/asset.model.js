/**
 * @file(asset.model.js) With Schema for asset model and all the db query function 
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 15-Jan-2018
 * @lastModifedBy Shakshi
 */

import mongoose from 'mongoose'
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

/**
 * [AssetSchema is used for device data validating aginst schema]
 * @type {[type]}
 */


const AssetSchema = mongoose.Schema({
    customerId : {type: mongoose.Schema.ObjectId },
    assetId : {type: Number },
    assetTypeId:{type: mongoose.Schema.ObjectId },
    assetName:{type: String },
    serialNo: {type: String },
    country:{type:String},
    city:{type: String},
    state:{type: String},
    area:{type: String},
    address:{type: String},
    minSpeed:{type:Number},
    maxSpeed:{type:Number},
    minTemperature:{type:Number},
    maxTemperature:{type:Number},
    status:{type: String },
    registerBy:{type: String},
    createAt:{type: Date},
    updatedAt:{type: Date}
}, {collection : 'asset'});
AssetSchema.plugin(AutoIncrement.plugin, { model: 'asset',
field: 'assetId',
startAt: 10,
incrementBy: 1
});

let AssetModel = mongoose.model('asset', AssetSchema);

 
 
/**
 *@description [is used for getting all data of asset from db]
 * @return {object}
 */

AssetModel.getAll = (dataToFind) => {
	console.log(dataToFind,"dataToFind")
    return AssetModel.aggregate([
        { $match: dataToFind.query},
        {
          $lookup:{
            from:"assettype",
            localField:"assetTypeId",
            foreignField:"_id",
            as:"assetType_docs"
          }

        },
        { 
          $unwind:"$assetType_docs"
        },
        {
            $project:{
                assetId : 1,
                assetTypeId:1,
                assetTypeName:"$assetType_docs.assetTypeName",
                assetName:1,
                serialNo: 1,
                country:1,
                city:1,
                state:1,
                area:1,
                address:1,
                status:1

            }
        }
    ]);
    return AssetModel.find(dataToFind.query,dataToFind.projection);

}

AssetModel.allAsset = (dataToFind)=>{
     console.log(dataToFind," = dataToFind2222")
    return AssetModel.find(dataToFind.query);
}

/**
 *@description [is used for getting one data of asset from db]
 * @return {object}
 */
AssetModel.getOne = (assetToFind) => {
    console.log(assetToFind," = assetToFind")
    return AssetModel.findOne(assetToFind);
}

AssetModel.getCount=(assetToCount)=>{
    return AssetModel.find(assetToCount.query).count();
}

/**
 * @description [add one device to db]
 * @param  {object}
 * @return {[object]}
 */
AssetModel.addAsset = (assetToAdd) => {
    return assetToAdd.save();
}

/**
 * @description [responsible for remove asset from db based on condition]
 * @param  {object}
 * @return {[object]}
 */
AssetModel.removeAsset = (assetId) => {
    return AssetModel.remove({assetId: assetId});
}

/**
 * @description [responsible for edit asset from db based on condition]
 * @param  {object}
 * @return {[object]}
 */
AssetModel.editAsset = (assetedit) => {
    return AssetModel.update(assetedit.query,assetedit.data);
}

/**
 * @description [make used by other module]
 */
export default AssetModel;

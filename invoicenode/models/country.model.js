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


const CountrySchema = mongoose.Schema({
    countryCode: { type: Number},
    countryName: { type: String },
    createdBy: { type: mongoose.Schema.ObjectId },
    createAt: { type: Date },
    updatedAt: { type: Date }
}, { collection: 'country' });
CountrySchema.plugin(AutoIncrement.plugin, {
    model: 'country',
    field: 'countryId',
    startAt:1,
    incrementBy: 1
});

let CountryModal = mongoose.model('country',CountrySchema);



/**
 *@description [is used for getting all data of asset from db]
 * @return {object}
 */

// CountrySchema.getAll = (dataToFind) => {
//     console.log(dataToFind, "dataToFind")
//     return CountrySchema.aggregate([
//         { $match: dataToFind.query },
//         {
//             $lookup: {
//                 from: "assettype",
//                 localField: "assetTypeId",
//                 foreignField: "_id",
//                 as: "assetType_docs"
//             }

//         },
//         {
//             $unwind: "$assetType_docs"
//         },
//         {
//             $project: {
//                 assetId: 1,
//                 assetTypeId: 1,
//                 assetTypeName: "$assetType_docs.assetTypeName",
//                 assetName: 1,
//                 serialNo: 1,
//                 country: 1,
//                 city: 1,
//                 state: 1,
//                 area: 1,
//                 address: 1,
//                 status: 1

//             }
//         }
//     ]);
//     return AssetModel.find(dataToFind.query, dataToFind.projection);



CountryModal.allCountry = (dataToFind) => {
    console.log(dataToFind, " = dataToFind2222")
    return Country.find(dataToFind.query);
}

/**
 *@description [is used for getting one data of asset from db]
 * @return {object}
 */
// AssetModel.getOne = (assetToFind) => {
//     console.log(assetToFind, " = assetToFind")
//     return AssetModel.findOne(assetToFind);
// }

// AssetModel.getCount = (assetToCount) => {
//     return AssetModel.find(assetToCount.query).count();
// }

/**
 * @description [add one device to db]
 * @param  {object}
 * @return {[object]}
 */
CountryModal.addCountry = (countryToAdd) => {
    return countryToAdd.save();
}

/**
 * @description [responsible for remove asset from db based on condition]
 * @param  {object}
 * @return {[object]}
 */


/**
 * @description [responsible for edit asset from db based on condition]
 * @param  {object}
 * @return {[object]}
 */
CountryModal.editCountry = (countryedit) => {
    return CountryModal.update(countryedit.query, countryedit.data);
}

/**
 * @description [make used by other module]
 */
export default CountryModal;

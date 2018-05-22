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
    countryCode: { type: String, index: { unique: true } },
    countryName: { type: String },
    createdBy: { type: mongoose.Schema.ObjectId },
    createAt: { type: Date },
    updatedAt: { type: Date },
    modifiedBy: { type: mongoose.Schema.ObjectId },
    isActive: { type: Boolean }
}, { collection: 'country' });



CountrySchema.plugin(AutoIncrement.plugin, {
    model: 'country',
    field: 'SerialNo',
    startAt: 1,
    incrementBy: 1
});

let CountryModal = mongoose.model('country', CountrySchema);


CountryModal.allCountry = (dataToFind) => {
    console.log(dataToFind, " = dataToFind2222")
    return CountryModal.find(dataToFind.query);
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

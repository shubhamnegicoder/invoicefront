import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);


const assetTypeSchema = mongoose.Schema({
    customerId: {type: String },
    assetTypeId: {type: Number },
    assetTypeName: {type: String },
    createdBy:{type: String},
    status:{type: String },
    createAt:{type: Date},
    updatedAt:{type: Date}
  }, {collection : 'assettype'});
   
  assetTypeSchema.plugin(AutoIncrement.plugin,{model:'assettype',field:'assetTypeId',startAt:1,incrementBy:1});

let AssetTypeModel = mongoose.model('assettype',assetTypeSchema);

AssetTypeModel.getAll = (dataToFind) => {
	console.log(dataToFind,"dataToFind");
 
  return AssetTypeModel.find(dataToFind.query,dataToFind.projection);
}

AssetTypeModel.getOne = (assetTypeToFind) => {
    console.log(assetTypeToFind," = assetTypeToFind")
    return AssetTypeModel.findOne(assetTypeToFind);
}

AssetTypeModel.addAssetType = (assetTypeToAdd) => {
    return assetTypeToAdd.save();
}

AssetTypeModel.removeAssetType = (assetTypeId) => {
    return AssetTypeModel.remove({assetTypeId: assetTypeId});
}

AssetTypeModel.modifyAssetType = (dataToUpdate) => {
  return AssetTypeModel.update(dataToUpdate.query,dataToUpdate.data);
}

export default AssetTypeModel;

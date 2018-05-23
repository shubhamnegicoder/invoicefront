import mongoose from 'mongoose';
// import AutoIncrement from "mongoose-auto-increment";
import ObjectID from "bson-objectid";
// AutoIncrement.initialize(mongoose);

const TaxSchema = mongoose.Schema({
    
    taxCode: {type: String ,index:{unique:true}},
    taxName: {type: String }, 
    cgst:{type:Number },
    sgst:{type:Number },
    igst:{type:Number },
    isActive: {type:Boolean},
    createdBy:{type:mongoose.Schema.ObjectId },
    createAt:{type: Date },
    updatedAt:{type: Date },
    modifiedBy:{type:mongoose.Schema.ObjectId },
    
 }, {collection : 'tax'});

//   UserSchema.plugin(AutoIncrement.plugin,{model:'user',field:'userId',startAt:1,incrementBy:1});

let TaxModel = mongoose.model('tax',TaxSchema);
TaxModel.getAll=(dataToFind) => {
    // console.log(dataToFind.query," = userToFind")
    return TaxModel.find(dataToFind.query);
}

TaxModel.addTax = (taxToAdd) => {
    return taxToAdd.save();
}

TaxModel.editTax = (taxToEdit) =>{
    // console.log(userToEdit,"hiiiii");
    return TaxModel.update(taxToEdit.query,taxToEdit.data);
}

export default TaxModel;

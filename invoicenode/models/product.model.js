import mongoose from 'mongoose';
// import AutoIncrement from "mongoose-auto-increment";
// import ObjectID from "bson-objectid";
// AutoIncrement.initialize(mongoose);

const ProductSchema = mongoose.Schema({
    
    productCode: {type: String ,index:{unique:true}},
    productName: {type: String }, 
    taxCode:{type:String},
    rate:{type:Number},
    isActive: {type:Boolean},
    createdBy: { type: mongoose.Schema.ObjectId },
    createAt: { type: Date },
    updatedAt: { type: Date },
    modifiedBy: { type: mongoose.Schema.ObjectId },
    
    
 }, {collection : 'product'});

//   UserSchema.plugin(AutoIncrement.plugin,{model:'user',field:'userId',startAt:1,incrementBy:1});

let ProductModel = mongoose.model('product',ProductSchema);
ProductModel.getAll = (dataToFind) => {
    console.log(dataToFind.query, " = dataToFindmadhar")
    return ProductModel.aggregate([
        { $match: {createdBy:dataToFind.query.createdBy} },
        {
            $lookup: {
                from: "tax",
                localField: "taxCode",
                foreignField: "taxCode",
                as: "tax_docs"
            }

        },
        {
            $unwind: "$tax_docs"
        },
        {
            $project: {
                productCode:1,
                productName:1 ,
                taxName: "$tax_docs.taxName",
                taxCode:1,
                rate:1,
                isActive:1

            }
        }
    ]);

}

ProductModel.searchProduct = (query) =>{
    console.log(query,"sssssssssssssssssssssssssss")
    return ProductModel.aggregate([
        {$match:{$and:[query]}},
        //  { $match: {$or:[{customerCode:dataToFind.query.customerCode},{countryCode:dataToFind.query.countryCode},{stateCode:dataToFind.query.stateCode},{cityCode:dataToFind.query.cityCode}]}},
        {
            $lookup: {
                from: "tax",
                localField: "taxCode",
                foreignField: "taxCode",
                as: "tax_docs"
            }

        },
        {
            $unwind: "$tax_docs"
        },
        {
            $project: {
                productCode:1,
                productName:1 ,
                taxName: "$tax_docs.taxName",
                taxCode:1,
                rate:1,
                isActive:1

            }
        }
    ]);

}


// UserModel.getAggregation = (query) => {
//     return UserModel.aggregate(query);
// }

ProductModel.addProduct = (productToAdd) => {
    return productToAdd.save(productToAdd);
}

ProductModel.editProduct = (productToEdit) =>{
    // console.log(userToEdit,"hiiiii");
    return ProductModel.update(productToEdit.query,productToEdit.data);
}


// UserModel.removeUser = (userId) => {
//     return UserModel.rve({userId: userId});
// }

// UserModel.getCount = (userToCount)=>{

//     return UserModel.find(userToCount.query).count();
// }

// /**qwe
//  * [Service is responsible for getting selected detail of user or client or admin]
//  * @param  {[type]} user [user object contains username and password]
//  * @return {[type]}      [object]
//  */
// UserModel.login = (user) =>{
//     return UserModel.findOne({emailId:user.emailId},{});
// }

// UserModel.forgetPassword = (user)=>{
//     return UserModel.find({emailId:user.emailId});
// }
// UserModel.forgetPasswordReset=(user)=>{
//     return UserModel.find({emailId:user.emailId});
// }
// UserModel.changePassword=(user)=>{
//     return UserModel.find({emailId:user.emailId});
// }
// UserModel.update=(userToEdit)=>{
//     return UserModel.update(userToEdit.query,userToEdit.set);
// }

export default ProductModel;

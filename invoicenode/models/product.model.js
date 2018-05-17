import mongoose from 'mongoose';
// import AutoIncrement from "mongoose-auto-increment";
// import ObjectID from "bson-objectid";
// AutoIncrement.initialize(mongoose);

const ProductSchema = mongoose.Schema({
    
    productCode: {type: String ,index:{unique:true}},
    productName: {type: String }, 
    date:{type:Date},
    tax:{type:String},
    rate:{type:Number},
    isActive: {type:Boolean},
    createdBy:{type:mongoose.Schema.ObjectId },
    modifiedBy:{type:mongoose.Schema.ObjectId },
    modifiedOn:{type: Date }
    
    
 }, {collection : 'product'});

//   UserSchema.plugin(AutoIncrement.plugin,{model:'user',field:'userId',startAt:1,incrementBy:1});

let ProductModel = mongoose.model('product',ProductSchema);

//   console.log(dataToFind,"dataToFinddataToFind111")
//    UserModel.getAll = (dataToFind) => {
//   return UserModel.aggregate([
//     { $match: dataToFind.query},
//     {
//       $lookup:{
//         from:"role",
//         localField:"roleId",
//         foreignField:"_id",
//         as:"role_docs"
//       }

//     },
//     {
//       $unwind:"$role_docs"
//     },
//     {
//         $project:{
//             parentId:1,
//             userId:1,
//             emailId: 1,
//             name:1,
//             userTypeId:1 ,
//             customerIds:1,
//             locations:1,
//             role:"$role_docs.role",
//             status:1

//         }
//     }
//    ]);
// }
ProductModel.getAll= () => {
    // console.log(userToFind," = userToFind")
    return ProductModel.find();
}

// UserModel.getAggregation = (query) => {
//     return UserModel.aggregate(query);
// }

ProductModel.addProduct = (productToAdd) => {
    return productToAdd.save();
}

ProductModel.editProduct = (productToEdit) =>{
    // console.log(userToEdit,"hiiiii");
    return ProductModel.update(productToEdit.query,productToEdit.data);
}


// UserModel.removeUser = (userId) => {
//     return UserModel.remove({userId: userId});
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

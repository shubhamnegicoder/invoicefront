import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const ClientSchema = mongoose.Schema({
    clientId: {type: Number },
    clientName: {type: String } ,
    email:{type: String },
    registrationNo: {type: String},
    address: {type: String },
    phone: {type: String },
    status:{type: String },
    state: {type:String},
    createdAt:{type: Date,default:Date.now},
    updatedAt: {type: Date, default: Date.now}
}, {collection : 'client'})

ClientSchema.plugin(AutoIncrement.plugin,{model:'client',field:'clientId',startAt:1,incrementBy:1});

let ClientModel = mongoose.model('client',ClientSchema);

ClientModel.getAll = () => {
    return ClientModel.find();
}

ClientModel.getOne = (clientToFind) => {
    return ClientModel.findOne(clientToFind);
}

ClientModel.addClient = (clientToAdd) => {
    return clientToAdd.save();
}

ClientModel.editClient = (clientToEdit) => {
    return ClientModel.update(clientToEdit.query,clientToEdit.data);
}

ClientModel.removeClient = (ClientId) => {
    return ClientModel.remove({clientId: clientId});
}

export default ClientModel;

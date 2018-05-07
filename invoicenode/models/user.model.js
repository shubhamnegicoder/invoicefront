import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const UserSchema = mongoose.Schema({
    token: { type: String },
    salt: { type: String },
    temp_str: { type: String },
    userId: { type: Number },
    emailId: { type: String, index: { unique: true } },
    password: { type: String },
    name: { type: String },
    address: { type: String },
    sector: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    status: { type: String },
    createAt: { type: Date },
    updatedAt: { type: Date }
}, { collection: 'user' });

UserSchema.plugin(AutoIncrement.plugin, { model: 'user', field: 'userId', startAt: 1, incrementBy: 1 });

let UserModel = mongoose.model('users', UserSchema);

UserModel.getAll = (dataToFind) => {
    console.log(dataToFind, "dataToFinddataToFind")
    return UserModel.find(dataToFind);
}
UserModel.addUser = (userToAdd) => {
    return userToAdd.save();
}

UserModel.editUser = (userToEdit) => {
    return UserModel.update(userToEdit.query, userToEdit.data);
}

UserModel.removeUser = (userId) => {
    return UserModel.remove({ userId: userId });
}

UserModel.getCount = (userToCount) => {

    return UserModel.find(userToCount.query).count();
}

/**
 * [Service is responsible for getting selected detail of user or client or admin]
 * @param  {[type]} user [user object contains username and password]
 * @return {[type]}      [object]
 */
UserModel.login = (user) => {
    return UserModel.findOne({ emailId: user.emailId }, { clientId: 1, password: 1, userId: 1, name: 1, emailId: 1, userType: 1, salt: 1, status: 1 });
}

UserModel.forgetPassword = (user) => {
    return UserModel.find({ emailId: user.emailId });
}
UserModel.forgetPasswordReset = (user) => {
    return UserModel.find({ emailId: user.emailId });
}
UserModel.changePassword = (user) => {
    return UserModel.find({ emailId: user.emailId });
}


export default UserModel;

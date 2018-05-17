import mongoose from 'mongoose'
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);


const StateSchema = mongoose.Schema({

    countryCode: { type: String},
    stateCode: { type: String ,  unique :true,index:true},
    stateName: { type: String },
    createdBy: { type: mongoose.Schema.ObjectId },
    createAt: { type: Date },
    updatedAt: { type: Date }
}, { collection: 'state' });
StateSchema.plugin(AutoIncrement.plugin, {
    model: 'state',
    field: 'SerialNo',
    startAt:1,
    incrementBy: 1
});

let StateModal = mongoose.model('state', StateSchema);

StateModal.allState = (dataToFind) => {
    console.log(dataToFind, " = dataToFind44")
    return StateModal.aggregate([
        { $match: {} },
        {
            $lookup: {
                from: "country",
                localField: "countryCode",
                foreignField: "countryCode",
                as: "country_docs"
            }

        },
        {
            $unwind: "$country_docs"
        },
        {
            $project: {
                SerialNo:1,
                countryCode:1 ,
                countryName: "$country_docs.countryName",
                stateCode:1,
                stateName:1

            }
        }
    ]);

    // return StateModal.find(dataToFind.query, dataToFind.projection);
}
StateModal.allSelectedState = (dataToFind) => {
    return StateModal.find(dataToFind.query);

}

StateModal.addState = (stateToAdd) => {
    return stateToAdd.save();
}

StateModal.editState = (stateedit) => {
    return StateModal.update(stateedit.query, stateedit.data);
}

export default StateModal;

import mongoose from 'mongoose'
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);


const CitySchema = mongoose.Schema({

    countryCode: { type: String },
    stateCode:{type:String},
    cityCode: { type: String, index: true, unique: true  },
    cityName: { type: String },
    createdBy: { type: mongoose.Schema.ObjectId },
    createAt: { type: Date },
    updatedAt: { type: Date }
}, { collection: 'city' });
CitySchema.plugin(AutoIncrement.plugin, {
    model: 'city',
    field: 'SerialNo',
    startAt:1,
    incrementBy: 1
});

let CityModal = mongoose.model('city', CitySchema);

CityModal.allCity = (dataToFind) => {
    console.log(dataToFind, " = dataToFind446666")
    return CityModal.aggregate([
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
            $lookup: {
                from: "state",
                localField: "stateCode",
                foreignField: "stateCode",
                as: "state_docs"
            }


        },
        {
            $unwind: "$state_docs"
        },

        {
            $project: {
                SerialNo:1,
                countryName: "$country_docs.countryName",
                stateName: "$state_docs.stateName",
                cityCode:1,
                cityName:1,
               
               

            }
        }
    ]);

    return CityModal.find(dataToFind.query, dataToFind.projection);
}

CityModal.addCity = (cityToAdd) => {
    // console.log(cityToAdd,"in city model")
    return cityToAdd.save();
}

CityModal.editCity = (cityedit) => {
    return CityModal.update(cityedit.query, cityedit.data);
}

export default CityModal;

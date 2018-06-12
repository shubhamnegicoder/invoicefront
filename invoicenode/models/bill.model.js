import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";

AutoIncrement.initialize(mongoose);

const BillSchema = mongoose.Schema({
    BillDate: { type: Date },
    BillNumber: { type: Number },
    companyName: { type: String },
    companyCode: { type: String },
    companyAddressLine1: { type: String },
    companyAddressLine2: { type: String },
    customerName: { type: String },
    customerCode: { type: String },
    customerAddressLine1: { type: String },
    customerAddressLine2: { type: String },
    items: [{
        itemCode: { type: String },
        itemName: { type: String },
        itemHsn: { type: String },
        itemQty: { type: Number },
        itemRate: { type: Number },
        itemTotal: { type: Number },
        itemDiscount: { type: Number },
    }],
    subTotal: { type: Number },
    discountTotal: { type: Number },
    invoiceTotal: { type: Number },
    createdBy: { type: mongoose.Schema.ObjectId },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    modifiedBy: { type: mongoose.Schema.ObjectId },
    status: { type: String }
}, { collection: 'bill' })

let BillModel = mongoose.model('bill', BillSchema);

BillSchema.plugin(AutoIncrement.plugin, { model: 'bill', field: 'billId', startAt: 1, incrementBy: 1 });

BillModel.getCount = (billToCount) => {
    return BillModel.find(billToCount.query).count();
}

BillModel.addBill = (billToAdd) => {
    return billToAdd.save();
}

export default BillModel;
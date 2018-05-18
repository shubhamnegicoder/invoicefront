import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const InvoiceSchema = mongoose.Schema({
    itemData: [
        {   companyName:{type:String},
            companyAddressLine1:{type:String},
            companyAddressLine2:{type:String},
            customerName:{type:String},
            customerAddressLine1:{type:String},
            customerAddressLine2:{type:String},
            invoiceNo:{type:Number},
            Date:{type:Date},
            itemCode: { type: String },
            itemName: { type: String },
            qty: { type: Number },
            rate: { type: Number },
            total: { type: Number },
            discount: { type: Number }
        }
    ]
}, { collection: 'invoice' });

InvoiceSchema.plugin(AutoIncrement.plugin, { model: 'invoice', field: 'invoiceId', startAt: 1, incrementBy: 1 });

let InvoiceModel = mongoose.model('invoice', InvoiceSchema);

InvoiceModel.addInvoice = (invoiceToAdd) => {
    return invoiceToAdd.save();
}

export default InvoiceModel;
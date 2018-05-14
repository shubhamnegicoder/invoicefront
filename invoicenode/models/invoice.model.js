import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const InvoiceSchema = mongoose.Schema({
    itemData: [
        {
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
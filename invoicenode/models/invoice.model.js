import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const InvoiceSchema = mongoose.Schema({
    itemData: [
        {   
            companyAddressLine1:{type:String},
            companyAddressLine2:{type:String},
            companyCode:{type:String},
            customerAddressLine1:{type:String},
            customerAddressLine2:{type:String},
            customerCode:{type:String},
            // discount: { type: Number },
            invoiceDate:{type:Date},
            invoiceNumber:{type:Number},
            // itemName: { type: String },
            // qty: { type: Number },
            // rate: { type: Number },
            // total:{ type: Number },
            // CGSTRate:{ type: Number },
            // CGSTAmount:{ type: Number },
            // IGSTRate:{ type: Number },
            // IGSTAmount:{ type: Number },
            // SGSTRate:{ type: Number },
            // SGSTAmount:{ type: Number },

        }
    ]
}, { collection: 'invoice' });

InvoiceSchema.plugin(AutoIncrement.plugin, { model: 'invoice', field: 'invoiceId', startAt: 1, incrementBy: 1 });

let InvoiceModel = mongoose.model('invoice', InvoiceSchema);

InvoiceModel.addInvoice = (invoiceToAdd) => {
    return invoiceToAdd.save();
}

InvoiceModel.allInvoice = (dataToFind) => {
    console.log(dataToFind, " = dataToFindinvoice")
    return InvoiceModel.aggregate([
        { $match: {} },
        {
            $lookup: {
                from: "customer",
                localField: "customerCode",
                foreignField: "customerCode",
                as: "customer_docs"
            }

        },
        {
            $unwind: "$customer_docs"
        },
        {
            $lookup: {
                from: "company",
                localField: "companyCode",
                foreignField: "companyCode",
                as: "company_docs"
            }


        },
        {
            $unwind: "$company_docs"
        },        {
            $project: {
                companyAddressLine1:1,
                companyAddressLine2:1,
                companyCode:1,
                companyName:"$company_docs.companyName",
                customerAddressLine1:1,
                customerAddressLine2:1,
                customerCode:1,
                customerName:"$customer_docs.customerName",
                discount:1,
                invoiceDate:1,
                invoiceNumber:1,
                itemName:1,
                qty:1,
                rate:1,
                total:1,
                CGSTRate:1,
                CGSTAmount:1,
                IGSTRate:1,
                IGSTAmount:1,
                SGSTRate:1,
                SGSTAmount:1

            }
        }
    ]);
}


export default InvoiceModel 
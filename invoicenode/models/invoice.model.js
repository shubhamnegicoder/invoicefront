import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
import ObjectId from 'bson-objectid';

AutoIncrement.initialize(mongoose);


const InvoiceSchema = mongoose.Schema({
    companyAddressLine1: { type: String },
    companyAddressLine2: { type: String },
    companyCode: { type: String },
    customerAddressLine1: { type: String },
    customerAddressLine2: { type: String },
    customerCode: { type: String },
    invoiceDate: { type: Date },
    invoiceNumber: { type: Number },
    items: [{
        itemCode:{type:String},
        name: { type: String },
        qty: { type: Number },
        rate: { type: Number },
        total: { type: Number },
        discount: { type: Number },
        CGSTRate: { type: Number },
        CGSTAmount: { type: Number },
        SGSTRate: { type: Number },
        SGSTAmount: { type: Number },
        IGSTRate: { type: Number },
        IGSTAmount: { type: Number }
    }],
    itemTotal: { type: Number },
    discountTotal: { type: Number },
    cgstTotal: { type: Number },
    sgstTotal: { type: Number },
    igstTotal: { type: Number },
    taxTotal: { type: Number },
    invoiceTotal: { type: Number },
    createdBy: { type: mongoose.Schema.ObjectId },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    modifiedBy: { type: mongoose.Schema.ObjectId }
}, { collection: 'invoice' });

InvoiceSchema.plugin(AutoIncrement.plugin, { model: 'invoice', field: 'invoiceId', startAt: 1, incrementBy: 1 });

let InvoiceModel = mongoose.model('invoice', InvoiceSchema);

InvoiceModel.addInvoice = (invoiceToAdd) => {
    return invoiceToAdd.save();
}

InvoiceModel.getCount = (invoiceToCount) => {
    // var startdate = invoiceToCount.query.invoiceyear + '-' + invoiceToCount.query.invoicemonth+'-'+'01'+"T00:00:00"
    const date = new Date();
    date.setDate("01")
    date.setMonth(--invoiceToCount.query.invoicemonth)
    date.setFullYear(invoiceToCount.query.invoiceyear)
    date.setHours("00");
    date.setMinutes("00");
    date.setSeconds("00");
    date.setMilliseconds("00");
    const endDate=new Date();
    endDate.setDate(invoiceToCount.query.invoicedate)
    endDate.setMonth(invoiceToCount.query.invoicemonth)
    endDate.setFullYear(invoiceToCount.query.invoiceyear)
    console.log(endDate,"date",date)
   console.log("invoiceToCount", invoiceToCount.query.invoicemonth);
    return InvoiceModel.find({$and:[{"invoiceDate": { $gt:date,$lte:endDate }

      ,createdBy:invoiceToCount.query.userid,companyCode:invoiceToCount.query.companycode

    }]}).count()
    }
InvoiceModel.getAllList=(data)=>{
    console.log("getalllist")
    return InvoiceModel.aggregate([
        { $match: {createdBy:data.query.createdBy} },
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
        }, {
            $project: {
                
                companyName: "$company_docs.companyName",
                
                customerName: "$customer_docs.customerName",
                
                invoiceDate: 1,
                invoiceNumber: 1,
               
                invoiceTotal: 1,
                createdBy: 1,
                createdAt: 1,
                updatedAt: 1,
                modifiedBy: 1
            }
        }
    ]);

}

InvoiceModel.sales = (invoiceSalesDate) => {
    const date = new Date();
    date.setDate("01")
    date.setMonth(--invoiceSalesDate.query.invoicemonth)
    date.setFullYear(invoiceSalesDate.query.invoiceyear)
    date.setHours("00");
    date.setMinutes("00");
    date.setSeconds("00");
    date.setMilliseconds("00");
    const endDate = new Date();
    endDate.setDate(invoiceSalesDate.query.invoicedate)
    endDate.setMonth(invoiceSalesDate.query.invoicemonth)
    endDate.setFullYear(invoiceSalesDate.query.invoiceyear)
    console.log("invoiceOfSales in sales model",date,endDate);
    return InvoiceModel.aggregate([
        {
            $match: {"invoiceDate":{ $gt: date, $lte: endDate }, createdBy:invoiceSalesDate.query.userid, companyCode:invoiceSalesDate.query.companycode }
        },
        {
        $group: {
            _id:"",
            total: { $sum: '$invoiceTotal' }
        }
    }, {
            $project: {
                total: 1
            }
        }
    ]);
}

InvoiceModel.topTenInvoice = (topTenData) => {
    const date = new Date();
    date.setDate("01")
    date.setMonth(--topTenData.query.invoicemonth)
    date.setFullYear(topTenData.query.invoiceyear)
    date.setHours("00");
    date.setMinutes("00");
    date.setSeconds("00");
    date.setMilliseconds("00");
    const endDate = new Date();
    endDate.setDate(topTenData.query.invoicedate)
    endDate.setMonth(topTenData.query.invoicemonth)
    endDate.setFullYear(topTenData.query.invoiceyear)
    console.log("topTenInvoice model", date, endDate);
    return InvoiceModel.aggregate([
        {
            $match: { "invoiceDate": { $gt: date, $lte: endDate }, createdBy: topTenData.query.userid, companyCode: topTenData.query.companycode }

               // .sort({ invoiceTotal: -1 }).limit(2)
            
                 
        }, { $sort: { invoiceTotal: -1 } }, { $limit: 10 },
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
        }, {
            $project: {
                logo: "$company_docs.logo",
                companyAddressLine1: 1,
                companyAddressLine2: 1,
                companyCode: 1,
                companyName: "$company_docs.companyName",
                customerAddressLine1: 1,
                customerAddressLine2: 1,
                customerCode: 1,
                customerName: "$customer_docs.customerName",
                discount: 1,
                invoiceDate: 1,
                invoiceNumber: 1,
                items: 1,
                itemTotal: 1,
                discountTotal: 1,
                cgstTotal: 1,
                sgstTotal: 1,
                igstTotal: 1,
                taxTotal: 1,
                invoiceTotal: 1,
                createdBy: 1,
                createdAt: 1,
                updatedAt: 1,
                modifiedBy: 1
            }
        }
    ]);

}
InvoiceModel.editInvoice = (invoiceToEdit) =>{
    console.log(invoiceToEdit,"hiiiii");
    return InvoiceModel.update(invoiceToEdit.query,invoiceToEdit.data);
}
InvoiceModel.getEditList = (invoiceToEdit) =>{
    console.log(invoiceToEdit,"hiiiii");
return InvoiceModel.find(invoiceToEdit.query);
}


InvoiceModel.allInvoice = (dataToFind) => {
    console.log(dataToFind.query.invoiceNumber, " = dataToFindinvoice for match")
    return InvoiceModel.aggregate([
        {
            $match: {
                invoiceNumber: dataToFind.query.invoiceNumber
            }
        },
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
        },
        {
            $project: {
                logo: "$company_docs.logo",
                companyAddressLine1: 1,
                companyAddressLine2: 1,
                companyCode: 1,
                companyName: "$company_docs.companyName",
                customerAddressLine1: 1,
                customerAddressLine2: 1,
                customerCode: 1,
                customerName: "$customer_docs.customerName",
                discount: 1,
                invoiceDate: 1,
                invoiceNumber: 1,
                items: 1,
                itemTotal: 1,
                discountTotal: 1,
                cgstTotal: 1,
                sgstTotal: 1,
                igstTotal: 1,
                taxTotal: 1, 
                invoiceTotal: 1,
                createdBy: 1,
                createdAt: 1,
                updatedAt: 1,
                modifiedBy: 1
            }
        }
    ]);
}

export default InvoiceModel; 

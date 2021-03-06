import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
import ObjectId from 'bson-objectid';

AutoIncrement.initialize(mongoose);

const InvoiceSchema = mongoose.Schema({
    invoiceDate: { type: Date },
    invoiceNumber: { type: Number },
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
        cgstRate: { type: Number },
        cgstAmount: { type: Number },
        sgstRate: { type: Number },
        sgstAmount: { type: Number },
        igstRate: { type: Number },
        igstAmount: { type: Number }
    }],
    subTotal: { type: Number },
    discountTotal: { type: Number },
    cgstTotal: { type: Number },
    sgstTotal: { type: Number },
    igstTotal: { type: Number },
    taxTotal: { type: Number },
    invoiceTotal: { type: Number },
    createdBy: { type: mongoose.Schema.ObjectId },
    createdAt: { type: Date },
    updatedAt: { type: Date },
    modifiedBy: { type: mongoose.Schema.ObjectId },
    status: { type: String }
}, { collection: 'invoice' })

InvoiceSchema.plugin(AutoIncrement.plugin, { model: 'invoice', field: 'invoiceId', startAt: 1, incrementBy: 1 });

let InvoiceModel = mongoose.model('invoice', InvoiceSchema);

InvoiceModel.addInvoice = (invoiceToAdd) => {
    return invoiceToAdd.save();
}

InvoiceModel.getUserInvoiceCount = (userInoviceCount) => {
    return InvoiceModel.find({

        $and: [{ createdBy: userInoviceCount.query.createdBy, status: "Invoiced" }]
    }).count();

}
InvoiceModel.getCount = (invoiceToCount) => {
    // var startdate = invoiceToCount.query.invoiceyear + '-' + invoiceToCount.query.invoicemonth+'-'+'01'+"T00:00:00"


    return InvoiceModel.find({
        $and: [{

            createdBy: invoiceToCount.query.userid, companyCode: invoiceToCount.query.companycode, status: "Invoiced"

        }]
    }).count()
}

InvoiceModel.getCount2 = (invoiceToCount) => {
    return InvoiceModel.find(invoiceToCount.query).count();
}


InvoiceModel.getAllList = (data) => {
    console.log("-----------------");
    console.log("getalllist", data)
    return InvoiceModel.aggregate([
        { $match: { createdBy: data.query.createdBy } },
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
                companyName: "$company_docs.companyName",
                customerName: "$customer_docs.customerName",
                invoiceDate: 1,
                invoiceNumber: 1,
                status: 1,
                invoiceTotal: 1,
                createdBy: 1,
                createdAt: 1,
                updatedAt: 1,
                modifiedBy: 1,

            }
        }
    ]);
}
InvoiceModel.userTotalSales = (userInvoiceTotalSales) => {
    return (InvoiceModel.aggregate([
        {
            $match: { createdBy: userInvoiceTotalSales.query.createdBy }

        },
        {
            $group: {
                _id: "",
                usertotalsales: { $sum: "$invoiceTotal" }
            }
        }, {
            $project: {
                usertotalsales: 1
            }
        }

    ]))
}

InvoiceModel.sales = (invoiceSalesDate) => {

    return InvoiceModel.aggregate([
        {
            $match: { createdBy: invoiceSalesDate.query.userid, companyCode: invoiceSalesDate.query.companycode }
        },
        {
            $group: {
                _id: "",
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

    return InvoiceModel.aggregate([
        {
            $match: { createdBy: topTenData.query.userid, companyCode: topTenData.query.companycode }

            // .sort({ invoiceTotal: -1 }).limit(2)


        }, { $sort: { invoiceNumber: -1 } }, { $limit: 10 },
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
                modifiedBy: 1,
                status: 1
            }
        }
    ]);
}
InvoiceModel.userTopTenInvoice = (topTenData) => {

    return InvoiceModel.aggregate([
        {
            $match: { createdBy: topTenData.query.userid }

            // .sort({ invoiceTotal: -1 }).limit(2)


        }, { $sort: { invoiceNumber: -1 } }, { $limit: 10 },
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
                modifiedBy: 1,
                status: 1
            }
        }
    ]);
}
InvoiceModel.editInvoice = (invoiceToEdit) => {
    console.log(invoiceToEdit, "hiiiiiMedha");
    return InvoiceModel.update(invoiceToEdit.query, invoiceToEdit.data);
}
InvoiceModel.getEditList = (invoiceToEdit) => {
    console.log(invoiceToEdit, "hiiiii");
    return InvoiceModel.find(invoiceToEdit.query);
}
InvoiceModel.getOneList = (invoiceToEdit) => {
    console.log(invoiceToEdit, "hiiiii");
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
                subTotal: 1,
                discountTotal: 1,
                cgstTotal: 1,
                sgstTotal: 1,
                igstTotal: 1,
                taxTotal: 1,
                invoiceTotal: 1,
                createdBy: 1,
                createdAt: 1,
                updatedAt: 1,
                modifiedBy: 1,
                companyGSTNo: "$company_docs.companyGSTNo",
                customerGSTNo: "$customer_docs.customerGSTNo"
            }
        }
    ]);
}
InvoiceModel.searchInvoice = (query) => {
    console.log(query, "sssssssssssssssssssssssssss")
    return InvoiceModel.aggregate([
        { $match: { $and: [query] } },
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
                modifiedBy: 1,
                status: 1,
            }
        }
    ]);
}


export default InvoiceModel; 

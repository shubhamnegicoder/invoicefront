import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";

AutoIncrement.initialize(mongoose);

const BillSchema = mongoose.Schema({
    billDate: { type: Date },
    billNumber: { type: Number },
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
    billTotal: { type: Number },
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

BillModel.allBill = (dataToFind) => {

    return BillModel.aggregate([
        {
            $match: {
                billNumber: dataToFind.query.billNumber
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
                billDate: 1,
                billNumber: 1,
                items: 1,
                subTotal: 1,
                discountTotal: 1,
                billTotal: 1,
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


BillModel.getAllList = (data) => {
    console.log("-----------------");
    console.log("getalllist", data)
    return BillModel.aggregate([
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
                billDate: 1,
                billNumber: 1,
                status: 1,
                billTotal: 1,
                createdBy: 1,
                createdAt: 1,
                updatedAt: 1,
                modifiedBy: 1,

            }
        }
    ]);
}

BillModel.searchBill = (query) => {
    console.log(query, "sssssssssssssssssssssssssss")
    return BillModel.aggregate([
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
                billDate: 1,
                billNumber: 1,
                items: 1,
                itemTotal: 1,
                discountTotal: 1,
                billTotal: 1,
                createdBy: 1,
                createdAt: 1,
                updatedAt: 1,
                modifiedBy: 1,
                status: 1,
            }
        }
    ]);
}


export default BillModel;
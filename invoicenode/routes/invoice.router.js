
import express from "express";
import invoiceService from "../service/invoice.service";

const router = express.Router()

router.post('/addInvoice', (req, res) => {
    invoiceService.addInvoice(req, res);
});
router.get('/countInvoice', (req, res) => {
    invoiceService.countInvoice(req, res);
});

router.get('/topTenInvoice', (req, res) => {
    invoiceService.topTenInvoice(req, res);
});

// router.get('/sales', (req, res) => {
//     invoiceService.sales(req, res);
// });


router.get('/allInvoice', (req, res) => {
    invoiceService.getAllInvoice(req, res);
});


export default router; 
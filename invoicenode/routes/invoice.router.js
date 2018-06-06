
import express from "express";
import invoiceService from "../service/invoice.service";

const router = express.Router()

router.post('/addInvoice', (req, res) => {
    invoiceService.addInvoice(req, res);
});
router.get('/countInvoice', (req, res) => {
    invoiceService.countInvoice(req, res);
});
router.get('/countInvoice2', (req, res) => {
    invoiceService.countInvoice2(req, res);
});

router.get('/topTenInvoice', (req, res) => {
    invoiceService.topTenInvoice(req, res);
});

router.get('/sales', (req, res) => {
    invoiceService.sales(req, res);
});
router.get('/searchInvoice', (req, res) => {
    invoiceService.searchInvoice(req, res);
});
router.get('/allInvoice', (req, res) => {
    invoiceService.getAllInvoice(req, res);
});
router.get('/allList', (req, res) => {
    invoiceService.getAllList(req, res);
});
router.get('/editList', (req, res) => {
    invoiceService.getEditList(req, res);
});
router.post('/editInvoice', (req, res) => {
    invoiceService.editInvoice(req, res);
});
router.get('/oneList', (req, res) => {
    invoiceService.getOneList(req, res);
});
export default router; 
import express from "express";
import billService from "../service/bill.service";

const router = express.Router();

router.get('/countBill', (req, res) => {
    billService.countBill(req, res);
});

router.post('/addBill', (req, res) => {
    billService.addBill(req, res);
});

router.get('/allBill', (req, res) => {
    console.log("req.query at /allBill -> ", req.query);
    billService.getAllBill(req, res);
});
router.get('/allBillList', (req, res) => {
    billService.getAllList(req, res);
})
export default router;
import express from "express";
import billService from "../service/bill.service";

const router = express.Router();

router.get('/countBill', (req, res) => {
    billService.countBill(req, res);
});

router.post('/addBill', (req, res) => {
    console.log("req.query at /addBill -> ", req.query)
    billService.addBill(req, res);
});

export default router;
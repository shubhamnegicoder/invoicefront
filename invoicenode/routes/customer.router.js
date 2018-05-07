/**
 * @file(Customer.router.js) All routing of asset
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 14-Jan-2018
 * @lastModifedBy Shakshi
 */
import express from "express";
import customerService from "../service/customer.service";

const router = express.Router()

router.post('/addCustomer', (req, res) => {
    customerService.addCustomer(req, res);
});

router.get('/allCustomer', (req, res) => {
    customerService.getAll(req, res);
});

router.post('/editCustomer',(req,res)=>{
	customerService.editCustomer(req,res)
})

export default router;
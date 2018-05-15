/**
 * @file(customer.router.js) All routing of asset
 * @author Purti Singh <purti.singh@limitlessmobil.com>
 * @version 1.0.0
 * @lastModifed 03-May-2018
 * @lastModifedBy Purti
 */
import express from "express";
import customerService from "../service/customer.service";

const router = express.Router()

router.get('/allCustomer', (req, res) => {
    customerService.getAll(req, res);
});

router.get('/oneCustomer', (req, res) => {
    customerService.getOne(req, res);
});


router.post('/addCustomer', (req, res) => {
    customerService.addCustomer(req, res);
});

router.post('/editCustomer', (req, res) => {
    customerService.editCustomer(req, res);
});

export default router;
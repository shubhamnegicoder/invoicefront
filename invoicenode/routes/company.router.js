/**
 * @file(company.router.js) All routing of asset
 * @author Purti Singh <purti.singh@limitlessmobil.com>
 * @version 1.0.0
 * @lastModifed 11-May-2018
 * @lastModifedBy Purti
 */
import express from "express";
import companyService from "../service/company.service";

const router = express.Router()

router.get('/allCompany', (req, res) => {
    companyService.getAll(req, res); 
});

router.post('/addCompany', (req, res) => {
    companyService.addCompany(req, res);
});

export default router;
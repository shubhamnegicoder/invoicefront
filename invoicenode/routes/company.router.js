/**
 * @file(company.router.js) All routing of asset
 * @author Purti Singh <purti.singh@limitlessmobil.com>
 * @version 1.0.0
 * @lastModifed 11-May-2018
 * @lastModifedBy Purti
 */
 
import express from "express"; 
import companyService from "../service/company.service";
//import path from "path";
import formidable from "formidable";
import fs from "fs-extra";

const router = express.Router()

router.get('/allCompany', (req, res) => {
    companyService.getAll(req, res); 
});

router.get('/oneCompany', (req, res) => {
    companyService.getOne(req, res); 
});

router.post('/addCompany', (req, res) => {
    companyService.addCompany(req, res); 
});
router.get('/searchCompany', (req, res) => {
    companyService.searchCompany(req, res);
});
router.post('/editCompany', (req, res) => {
   
    companyService.editCompany(req, res);
});

router.get('/getOneCompany', (req, res) => {
    companyService.getOneCompany(req, res);
  });

  router.get('/getOneByCompanyName', (req, res) => {
    companyService.getByCompanyName(req, res);
  });


router.post('/removeLogo', (req, res) => {
    companyService.removeLogo(req, res);
});
 
export default router;
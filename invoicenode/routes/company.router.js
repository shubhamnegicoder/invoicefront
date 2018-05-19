/**
 * @file(company.router.js) All routing of asset
 * @author Purti Singh <purti.singh@limitlessmobil.com>
 * @version 1.0.0
 * @lastModifed 11-May-2018
 * @lastModifedBy Purti
 */

import express from "express";
import companyService from "../service/company.service";
import multer from "multer";
import path from 'path';

const router = express.Router()

const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, callback) {
        callback(null, file.originalname); 
    }
  });

  var upload = multer({ storage : storage});  

router.get('/allCompany', (req, res) => {
    companyService.getAll(req, res); 
});

router.get('/oneCompany', (req, res) => {
    companyService.getOne(req, res); 
});

router.post('/addCompany',upload.single('file'), (req, res) => {
//console.log(res);

    if (!req.file) {
        console.log("No file received");
        companyService.addCompany(req, res);
        return res.send({
          success: false
        });
    
      } else {
        console.log('file received');
        companyService.addCompany(req, res);
        return res.send({
          success: true
        })
      }
    
});

router.post('/editCompany', (req, res) => {
    companyService.editCompany(req, res);
});

export default router;
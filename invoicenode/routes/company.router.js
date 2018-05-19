/**
 * @file(company.router.js) All routing of asset
 * @author Purti Singh <purti.singh@limitlessmobil.com>
 * @version 1.0.0
 * @lastModifed 11-May-2018
 * @lastModifedBy Purti
 */
import express from "express";
import companyService from "../service/company.service";
import multer from 'multer';
import uuidv4 from 'uuid/v4';
import path from './uploads/uploads';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      /*
        Files will be saved in the 'uploads' directory. Make
        sure this directory already exists!
      */
      cb(null, '../');
    },
    filename: (req, file, cb) => {
      /*
        uuidv4() will generate a random ID that we'll use for the
        new filename. We use path.extname() to get
        the extension from the original file name and add that to the new
        generated ID. These combined will create the file name used
        to save the file on the server and will be available as
        req.file.pathname in the router handler.
      */
      const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, newFilename);
    },
  });
  // create the multer instance that will be used to upload/save the file
  const upload = multer({ storage });


const router = express.Router()

router.get('/allCompany', (req, res) => {
    companyService.getAll(req, res); 
});

router.get('/oneCompany', (req, res) => {
    companyService.getOne(req, res); 
});

router.post('/addCompany', upload.single('selectedFile'), (req, res) => {
    companyService.addCompany(req, res);
});

router.post('/editCompany', (req, res) => {
    companyService.editCompany(req, res);
});

export default router;
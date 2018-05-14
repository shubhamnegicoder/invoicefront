/**
 *
 * @lastModifed 14-Jan-2018
 * @lastModifedBy Shakshi
 */
import express from "express";
import countryService from "../service/country.service";

const router = express.Router()

router.get('/allCountry', (req, res) => {
    countryService.getAllCountry(req, res);
});


router.post('/addCountry', (req, res) => {
    countryService.addCountry(req, res);
});


router.post('/editCountry', (req, res) => {
  countryService.editCountry(req, res);
});
// router.get('/getAllAsset', (req, res) => {
//     assetService.getAllAsset(req, res);
// });

export default router;

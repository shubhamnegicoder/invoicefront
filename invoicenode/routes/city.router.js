/**
 *
 * @lastModifed 14-Jan-2018
 * @lastModifedBy Shakshi
 */
import express from "express";
import cityService from "../service/city.service";

const router = express.Router()

router.get('/allCity', (req, res) => {
    cityService.getAllCity(req, res);
});


router.post('/addCity', (req, res) => {
    cityService.addCity(req, res);
});


router.post('/editCity', (req, res) => {
    cityService.editCity(req, res);
});
// router.get('/getAllAsset', (req, res) => {
//     assetService.getAllAsset(req, res);
// });

export default router;

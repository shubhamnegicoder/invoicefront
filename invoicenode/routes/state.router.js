/**
 *
 * @lastModifed 14-Jan-2018
 * @lastModifedBy Shakshi
 */
import express from "express";
import stateService from "../service/state.service";

const router = express.Router()

router.get('/allState', (req, res) => {
    stateService.getAllState(req, res);
});

router.get('/allSelectedState', (req, res) => {
    stateService.getAllSelectedState(req, res); 
});


router.post('/addState', (req, res) => {
    stateService.addState(req, res);
});


router.post('/editState', (req, res) => {
    stateService.editState(req, res);
});
// router.get('/getAllAsset', (req, res) => {
//     assetService.getAllAsset(req, res);
// });

export default router;

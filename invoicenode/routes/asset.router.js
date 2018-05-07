/**
 * @file(asset.router.js) All routing of asset
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 14-Jan-2018
 * @lastModifedBy Shakshi
 */
import express from "express";
import assetService from "../service/asset.service";

const router = express.Router()

router.get('/allAsset', (req, res) => {
    assetService.getAll(req, res);
});

router.get('/oneAsset', (req, res) => {
    assetService.getOne(req, res);
});

router.post('/addAsset', (req, res) => {
    assetService.addAsset(req, res);
});

router.post('/deleteAsset', (req, res) => {
    assetService.deleteAsset(req, res);
});

router.post('/editAsset', (req, res) => {
    assetService.editAsset(req, res);
});
router.get('/getAllAsset', (req, res) => {
    assetService.getAllAsset(req, res);
});

export default router;

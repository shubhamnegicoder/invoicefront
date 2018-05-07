import express from "express";
import assetTypeService from "../service/assetType.service";

const router = express.Router()

router.get('/allAssetType', (req, res) => {
    assetTypeService.getAll(req, res);
});

router.post('/addAssetType', (req, res) => {
    assetTypeService.addAssetType(req, res);
});

router.post('/deleteAssetType', (req, res) => {
    assetTypeService.deleteAssetType(req, res);
});

router.post('/updateAssetType', (req,res)=>{
    assetTypeService.updateAssetType(req,res);
})

export default router;

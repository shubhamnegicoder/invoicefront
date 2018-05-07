/**
 * @file(asset.router.js) All routing of asset
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 29-Jan-2018
 * @lastModifedBy Deepak
 */
import express from "express";
import RoleService from "../service/role.service";

const router = express.Router()

router.get('/allRole', (req, res) => {
    RoleService.getAll(req, res);
});

router.post('/addRole', (req, res) => {
    RoleService.addRole(req, res);
});

router.post('/deleteRole', (req, res) => {
    RoleService.deleteRole(req, res);
});

router.post('/editRole', (req, res) => {
    RoleService.editRole(req, res);
});


export default router;

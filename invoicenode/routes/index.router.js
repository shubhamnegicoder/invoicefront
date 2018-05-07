
import express from "express";
const router = express.Router()

import device from './device.router.js';
import asset from './asset.router.js';
import user from './user.router.js';
import usertype from './usertype.router.js';
import assettype from './assettype.router.js';
import client from './client.router.js';

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

export default router;
import express from "express";
import clientService from "../service/client.service";

const router = express.Router()

router.get('/allClient', (req, res) => {
    clientService.getAll(req, res);
});

router.get('/oneClient', (req, res) => {
    clientService.getOne(req, res);
});

router.post('/addClient', (req, res) => {
    clientService.addClient(req, res);
});

router.post('/editClient', (req, res) => {
    clientService.editClient(req, res);
});

router.post('/deleteClient', (req, res) => {
    clientService.deleteClient(req, res);
});

export default router;

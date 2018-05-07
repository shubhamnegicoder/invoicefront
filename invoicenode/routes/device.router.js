/**
 * @file(device.router.js) All routing of device,device Tracker and Device Tracker history
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 11-Jan-2018
 * @lastModifedBy Shakshi
 */
import express from "express";
import deviceService from "../service/device.service";
import deviceTrackerService from "../service/deviceTracking.service";
import deviceTrackerHistoryService from "../service/deviceTrackingHistory.service";
const router = express.Router()

router.get('/allDevice', (req, res) => {
    deviceService.getAll(req, res);
});
router.get('/oneDevice',(req,res)=>{
    deviceService.getOne(req, res);
})

router.post('/editDevice',(req,res)=>{
    deviceService.editDevice(req,res);
});
router.post('/addDevice', (req, res) => {
	console.error("hiiiiiiiii")
    deviceService.addDevice(req, res);
});

router.delete('/deleteDevice', (req, res) => {
    deviceService.deleteDevice(req, res);
});


router.get('/allDeviceData', (req, res) => {
    deviceTrackerService.getAll(req, res);
});

router.get('/addDeviceData', (req, res) => {
    deviceTrackerHistoryService.addDeviceTrackingHistoryData(req, res);
});

router.get('/allDeviceHistoryData', (req, res) => {
    deviceTrackerHistoryService.getAllDeviceHistoryLatLng(req, res);
});

router.get('/allDeviceRecentData', (req, res) => {
    deviceTrackerHistoryService.getAllDeviceRecentLatLng(req, res);
});




export default router;

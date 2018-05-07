import express from 'express'
import  dashboardService from '../service/dashboard.service'

const router = express.Router()
router.get('/getCount',(req,res)=>{
    dashboardService.getCount(req,res);

});
 export default router;
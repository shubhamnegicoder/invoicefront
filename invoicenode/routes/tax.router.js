
import express from "express";
import taxService from "../service/tax.service";

const router = express.Router()

router.get('/allTax', (req, res) => {
    taxService.getAll(req, res);
});

// router.get('/oneUser', (req, res) => {
//     userService.getOne(req, res);
// });

router.post('/addTax', (req, res) => {
    taxService.addTax(req, res);
});

router.post('/editTax', (req, res) => {
    taxService.editTax(req, res);
});

// router.post('/deleteUser', (req, res) => {
//     taxService.deleteUser(req, res);
// }); 

// router.post('/login', (req, res) => {
//     userService.login(req, res);
// });

// router.post('/forgetPassword',(req,res)=>{
//     userService.forgetPassword(req,res);
// })
// router.post('/forgetPasswordReset',(req,res)=>{
//     userService.forgetPasswordReset(req,res);
// })
// router.post('/changePassword',(req,res)=>{
//     userService.changePassword(req,res);
// })
//  router.post('/updateUser',(req,res)=>{
//      userService.update(req,res);
//  })
 

export default router;

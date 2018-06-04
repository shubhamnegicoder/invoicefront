import express from "express";
import productService from "../service/product.service.js";

const router = express.Router()

router.get('/allProduct', (req, res) => {
    productService.getAll(req, res);
});

// router.get('/oneUser', (req, res) => {
//     userService.getOne(req, res);
// });

router.post('/addProduct', (req, res) => {
    productService.addProduct(req, res);
});

router.post('/editProduct', (req, res) => {
    productService.editProduct(req, res);
});
router.get('/searchProduct', (req, res) => {
    productService.searchProduct(req, res);
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

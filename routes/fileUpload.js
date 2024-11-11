const express=require("express");
const router=express.Router();

const{localUpload,imageUpload }=require("../controllers/fileupload");


router.post('/localupload',localUpload);
router.post('/imageUpload',imageUpload );


module.exports=router;

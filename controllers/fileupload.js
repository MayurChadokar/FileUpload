const file=require("../models/file");
const cloudinary= require('cloudinary').v2;


exports.localUpload= async (req,res) => {
    try{
       const uploadfile=req.files.file;
       console.log("file is that " ,uploadfile);

       let path= __dirname + "/files/" + Date.now()+ `.${uploadfile.name.split('.')[1]}`;
    

       uploadfile.mv(path,(error)=>{
        console.error(error);

       });

      return res.status(200).json({
        success:true,
        message:"fileupload successfully",

       });
    }
    catch(error){
     return res.status(500).json({
        success:false,
        message:"file could not upload",
     })
    }
}


function issupported(file, supportedFile){
   const fileType=file.name.split('.')[1].toLowerCase();
   return supportedFile.includes(fileType);

}


async function uploadToCloudianry(file, folder) {
   const options={ folder };

   const result = await cloudinary.uploader.upload(file, options);
    return result; 
}


exports.imageUpload = async (req,res)=> {
try{
 const {name, email, tag}=req.body;
 const file= req.files.imageFile;
 console.log(file);
 console.log(name,email,tag);


const supportFile= ["jpg","jpeg","png"];
console.log("file is supored ",issupported(file,supportFile));

 //if file is not supported
if(!issupported(file,supportFile)){
   res.status(415).json({
      success:false,
      messsage:"invalid file, does not supported file",

   });

   // if file is supported in system

const response =await uploadToCloudianry(file,"mayurchadokar");
 console.log(response);

 const fileData= await file.Create({
   name,
   email,
   tag,
   imageURL:response.secure_url,

 });


 res.json({
   success:true,
   message:"image upload success fully"

 });



}

}
catch(error){
   console.error(error);
   return res.json({
      success:false,
      message:"something want wrong"

   });


}
}
const mongoose=require("mongoose");

const  fileSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    imageURL:{
     type:String
    },
    tag:{
        type:String
    },
    email:{
        type:String,
        required:true,
    }

});

module.exports=  mongoose.model("file",fileSchema);

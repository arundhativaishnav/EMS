import mongoose from "mongoose";

const userSchema = new moongose.Schema({
    name :{type : String , require : true },
    email :{type : String , require : true },
    password :{ type:string , required : true },
    role : {type:String , enum: ["admin", "employee"] , required: true },
    profileImage : {type:String},
    createAt : {type: date , default: Date.now },
    updatedAt : {type: date , default: Date.now },
   
})
const User = mongoose.model("User" , userSchema)
export default User 
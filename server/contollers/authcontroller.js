import jwt from 'jsonwebtoken'
import User from '../Models/User.js'
import bcrypt from 'bcrypt';


const AdminLogin = async (req , res ) =>{
    try {
        const {email,password } = req.body;
        const existingUser = await User.findOne({email});
        if(!existingUser){
            res.status(404).json({
                success: false , error: "user not found"
            })
        }
        const isMatch = await bcrypt.compare(password , existingUser.password)
        if(!isMatch){
            res.status(404).json({
                success : false , error : " Wrong password "
            })
        }

        const token = jwt.sign({_id : existingUser._id , role: existingUser.role},
            process.env.JWT_KEY, {expiresIn : "10d"}
        )
        res.status(200).json({
            success : true , token , User:{_id : existingUser._id,name : existingUser.name, role: existingUser.role}
        });

    } catch (error) {
        console.log(error);
    }

}
export {AdminLogin};
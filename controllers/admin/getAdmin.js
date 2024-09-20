import { User } from "../../models/user.js"

export const getAdmin = async(req,res)=>{
    try {
        const currUser = req.user
        const user = await User.findById({_id:currUser}).select("-profileImage")
        if (!user) {
            return res.json({
                success:false,
                message:"You are not admin"
            })
        }
        return res.json({
            success:true,
            message:"You are admin",
            data:user
        })
        
    } catch (error) {
        return res.json({
            success:false,
            message:"Error while get admin"
        })
        
    }
}
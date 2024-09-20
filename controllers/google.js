export const google = async(req,res)=>{
    try {
        const {email,name} = req.body
        const findUser = await User.findOne({email})
        if (findUser) {
            const accessToken = jsonwebtoken.sign({id: existsUser._id},process.env.ACCESS_TOKEN,{
                expiresIn:process.env.ACCESS_TOKEN_EXPIRY
            })
            const refreshToken = jsonwebtoken.sign({id: existsUser._id},process.env.REFRESH_TOKEN,{
                expiresIn:process.env.REFESH_TOKEN_EXPIRY
            })
            res.cookie("accessToken",accessToken,{httpOnly:true,secure:true,maxAge:100000})
            res.cookie("refreshToken",refreshToken,{httpOnly:true,secure:true,maxAge:50000})

            return res.json({
                success:true,
                data:findUser,
                message:"Successed to login with google"
            })
        }
        else{
            const newUser = new User({...req.body})
            const user = await newUser.save()

            const accessToken = jsonwebtoken.sign({id: existsUser._id},process.env.ACCESS_TOKEN,{
                expiresIn:process.env.ACCESS_TOKEN_EXPIRY
            })
            const refreshToken = jsonwebtoken.sign({id: existsUser._id},process.env.REFRESH_TOKEN,{
                expiresIn:process.env.REFESH_TOKEN_EXPIRY
            })
            res.cookie("accessToken",accessToken,{maxAge:100000})
            res.cookie("refreshToken",refreshToken,{httpOnly:true,secure:true,maxAge:50000})

            return res.status(200).json({
                Login: true,
                success: true,
                data:user,
                message: "Login successed create with google auth",
              });


        }
       
    } catch (error) {
     return res.json({
         success:false,
         message:"Error while creating Login"
     })
    }
 }

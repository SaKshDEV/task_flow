const jwt = require("jsonwebtoken");

const protect = (req,res,next) =>{
    try{
        const authHeader = req.header.authorization;

        if(!authHeader){
            return res.status(401).json({
                messsage:"no token is provided"
        });
        }
        const token = authHeader.split(" ")[1];

        if(!token){
            return res.status(401).json({
                message: "invald token"
            });
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.user=decoded;

        next();
    } catch(error){
        return res.status(401).json({
            message:"invalid or expired token"

        });
    }
    };
    module.exports = protect;

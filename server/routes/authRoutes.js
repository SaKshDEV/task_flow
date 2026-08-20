const User = require("../models/User")
const bcrypt = require("bcryptjs");

const registerUser = async (req,res) =>{
    try{
        const { name , email , password } = req.body;

        const existingUser = await User.findOne({email});

        if (existingUser) {
            return res.status(400).json({
                message: "user already exist"
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(200).json({
            message: "user created succesfully",
            user:{
                id: user.id,
                name: user.name,
                email: user.email
                
            }
        });
    }
        catch(error){
            res.status(500).json({
                message: "server error",
                error: error.message

            });
        }

    };

    module.exports = {
        registerUser
    };


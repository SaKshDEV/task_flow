const User = require("../models/User")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const registerUser = async (req,res) =>{
    try{
        console.log("Register API hit");

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

    const loginUser = async (req,res) => {
        try{
            const { email, password } =  req.body;
            
            const user = await User.findOne({ email });

            if(!user) {
                return res.status(400).json({
                    message:"invalid password or email"
                });
            }
            const isPasswordCorrect = await bcrypt.compare(
                password,
                user.password
            );
            if(!isPasswordCorrect) {
                return res.status(400).json({
                    message:"invalid password or email"
                });
            }
            const token = jwt.sign(
                {
                    userId: user._id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d"

                }
            );
       res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

    

    module.exports = {
        registerUser,
        loginUser
    };


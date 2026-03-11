
const User = require('../models/user.model')
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) =>{
    try{
        const { name, email, password } = req.body

        if(!name || !email || !password){
            return res.status(400).json({status: "Failure", message:"All fields are required"})
        }

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User alrady exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
                name,
                email,
                password: hashedPassword
        });
        res.status(200).json({status: "Success", message:"User created successfully"})
    }
    catch(err){
        console.log(err);
        res.status(500).json({status: "Failure", message:"User can't be registered, pls try later"})
    }
}

exports.login = async(req, res)=>{
    try{
        const { email, password } = req.body
        if(!email || !password){
            return res.status(400).json({status:"failure", message:"All fields required"})
        }

        const user = await User.findOne({ email })
        if(!user){
            return res.status(400).json({status:"Failure", message:"User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({status:"Failure", message:"Invalid credentials"})
        }
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '1d'})

        res.status(200).json({status:"Success", message:"Login Successful", token})
    }
    catch(err){
        console.log(err);
        res.status(400).json({status:"Failure", message: err.message})
    }
}
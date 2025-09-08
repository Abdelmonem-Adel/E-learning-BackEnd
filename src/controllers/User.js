import User from "../DB/models/User.js";
import bcrypt from "bcrypt";
export const RegisterUser=async(req,res)=>{
    try{
        const {First_Name,Last_Name,email,password,role,bio}=req.body;
        //check required fields
        if(!First_Name || !Last_Name || !email || !password || !role){
            return res.status(400).json({message:"Please provide all required fields"});
        }
        //if user exists
        const existingUser=await User.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        //hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        //create user
        const newUser=new User({
            role,
            First_Name,
            Last_Name,
            email,  
            password:hashedPassword,

        });
        await newUser.save();
        res.status(201).json({message:"User registered successfully",
            user:{
                id:newUser._id,
                email:newUser.email,
                role:newUser.role,
                First_Name:newUser.First_Name,
                Last_Name:newUser.Last_Name,
                bio:newUser.bio 
            },
        });
    }catch(err){
        res.status(500).json({message:err.message});

    }
};
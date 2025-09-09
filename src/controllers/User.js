import User from "../DB/models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
export const getAllUsers=async(req,res)=>{
    try{
        const users=await User.find();
        res.status(200).json(users);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};
export const getById=async(req,res)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    res.status(200).json(user);
};
export const updateUser=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id);
        const {First_Name,Last_Name,email,password,bio}=req.body;
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        if(First_Name)
            user.First_Name=First_Name;
        if(Last_Name)
            user.Last_Name=Last_Name;
        if(email)
            user.email=email;
        if(password){
            const salt=await bcrypt.genSalt(10);
            const hashedPassword=await bcrypt.hash(password,salt);
            user.password=hashedPassword;
        }
        if(bio)
            user.bio=bio;
        await user.save();
        res.status(200).json({message:"User updated successfully",user:user});
    }catch(err){
        res.status(500).json({message:err.message});
    };
};
export const deleteUser=async(req,res)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    else{
        await user.deleteOne({_id:user._id});
        res.status(200).json({message:"User deleted successfully"});
    }
};
export const LoginUser=async(req,res)=>{
    const {email,password,rememberMe}=req.body;
    try{
        //check required fields
        if(!email || ![password]){
            return res.status(400).json({message:"Please provide all required fields"});
        }
        //find user
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid email or password"});
        }
        //compare password
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid email or password"});
        }
        //generate token
        const token=jwt.sign({id:user._id,email:user.email,role:user.role},process.env.JWT_SECRET,{
            expiresIn: rememberMe?"30d":"1h"
        });
        res.status(200).json({
            message:"Login successful",
            token,
            user:{
                id:user._id,
                email:user.email,
                role:user.role,
                First_Name:user.First_Name,
                Last_Name:user.Last_Name,
                bio:user.bio
            }
        });
    }catch(err){
        res.status(500).json({message:err.message});
    }
};
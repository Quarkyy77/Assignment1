import express from 'express';
import mongoose from 'mongoose';
 

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
         type:String,
         required:true,
         unique:true,
         validate: {
            validator: function(v:string) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        }
        },
    Contact:{ type:Number, min: 8},
    DOB:{ type:Date},
    Gender:{type:String,
    enum:"Male"||"Female"||"Other" 
           },
    age:{type: Number},
    //   hobbies:{type: Array
    //[reading, playing ]},    

    authentication:{
        password:{type:String,required:true, select:false},
        salt:{type:String,select:false},
        sessionToken:{type:String,select:false},    
    }
})
export const UserModel=mongoose.model('User',userSchema);
export const getUsers=()=>UserModel.find();
export const getUserByEmail=(email:string)=>UserModel.findOne({email});
export const getUserBySessionToken=(sessionToken:string)=>UserModel.findOne({
    'authentication.sessionToken':sessionToken,
});
export const getUserById=  (id:string)=>UserModel.findById(id); 
export const createUser=(values:Record<string, any>)=> new UserModel(values)
.save().then((user)=>user.toObject());
export const deleteUserById=(id:string)=>UserModel.findByIdAndDelete({_id:id});
export const updateUserById=(id:string, values:Record<string, any>) => UserModel.findByIdAndUpdate(id,values);

 
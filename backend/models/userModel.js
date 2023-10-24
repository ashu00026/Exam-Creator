import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

// evey before(pre) we save or create a user it runs
userSchema.pre('save',async function(next){
    
    // but we want to apply this only when we change the password, not every time
    if(this.isModified('password')){
        // const salt=await bcrypt.genSalt(8);
        this.password=await bcrypt.hash(this.password, 8); // 12 rounds of hashing
        // this.confirmpassword=await bcrypt.hash(this.confirmpassword, 8);
    }
    next(); // the middleware is completed now further functions can run
})


// this function is called by the user in controller (post /login)
userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

const User=mongoose.model('User',userSchema);

export default User;



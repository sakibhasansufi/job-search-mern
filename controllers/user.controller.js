import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'

export const register = async (req, res) => {
    try {
        const { fullName, email, phoneNumber, password, role } = req.body;
        if (!fullName || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Required field",
                success: false
            });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "This email already exist",
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullName,
            email,
            phoneNumber,
            password: hashedPassword,
            role
        }
        )
    } catch (error) {

    }
}

export const login = async (req,res) =>{
    try {
        const {email,password,role} = req.body;
    } catch (error) {
        
    }
}
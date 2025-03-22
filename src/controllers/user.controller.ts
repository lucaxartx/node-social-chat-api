import { Request, Response} from 'express';
import bycrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel, {IUser} from '../models/user.model';
import settings from '../config/settings';


export const signup = async (req: Request, res: Response): Promise<void> => {
    try{
        const {
            username, email, password
        } = req.body;

        if (!username || !email || !password){
            res.status(400).json({message: 'Userusername, email and password are required'})
            return;
        }

        const existingUser = await UserModel.findOne({email: email});
        if (existingUser){
            res.status(400).json({message: 'email already exists'})
            return;
        }
        const hashedPassword = await bycrypt.hash(password, 10);

        const newUser: IUser = new UserModel({
            username,
            email,
            password: hashedPassword}
        )

        await newUser.save();

        const token = jwt.sign(
            {id: newUser._id,
                email: newUser.email
            },
            settings.JWT_SECRET_KEY,
            {expiresIn: '1h'}
        )



        res.status(201).json({
            message: 'User created Successfully', token, newUser
        })


    }catch(error){
        console.error('Signup Error', error)
        res.status(500).json({message: 'Internal server error during signup'})
    }
}

export const signin = async (req: Request, res: Response): Promise<void> => {
    try{
        const {email, password} = req.body;

        if (!email || !password){
            res.status(400).json({meessage: "Email and password required"})
            return;
        }
        const user = await UserModel.findOne({email: email})
        if (!user){
            res.status(400).json({meessage: "User does not exist"})
            return;
        }

        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch){
            res.status(401).json({message: 'invalid password'})
        }

        const token = jwt.sign(
            {id: user._id,
                email: user.email
            },
            settings.JWT_SECRET_KEY,
            {expiresIn: '1h'}
        )

        res.status(200).json({
            message: 'User signin Successfully', token, user
        })

    }catch(error){
        console.error(error)
        res.status(500).json({
            message: 'error'
        })

    }
}
import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import { StatusCodes } from 'http-status-codes';
import { AuthRequest } from '../middlewares/auth';
import cloudinary from '../utils/cloudinary.utils'
import upload from '../middlewares/mutler'
export const getProfile = async (req: AuthRequest, res: Response): Promise<any> => {
    try {

        const userId = req.user.userId;
        if (!userId) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'not authorized' });
            return;

        }

        const user = await UserModel.findById(userId).select('-password');

        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
            return;
        }

        res.status(StatusCodes.OK).json(user);
    } catch (error) {
        console.error('Get Profile Error:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
};


export const updateProfile = async (req: AuthRequest, res: Response) => {
    try {
        const {

            body: { username, email, password, bio, location }
        } = req

        const user = await UserModel.findOne({ _id: req.user.userId })

        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
            return;
        }

        user.username = username
        user.email = email
        user.password = password
        user.location = location
        user.bio = bio


        await user.save()
        res.status(StatusCodes.OK).json({ msg: "user details updated successfully ", user })


    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "something went wrong " })
    }
}
export const uploadImage = async (req: Request, res: Response) => {
    try {
        // Image Handel
        const urls = []

        let files: any
        files = req.files
        for (const file of files) {
            const { path } = file

            const newPath = await cloudinary(path)
            urls.push(newPath)
        }

        const multiImage = urls.map((url: any) => url.res)
        res.status(200).json(multiImage)
    }
    catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}
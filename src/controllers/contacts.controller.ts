import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { AuthRequest } from '../middlewares/auth';
import UserModel from '../models/user.model';
import ContactRequestModel from '../models/friendReq.model';

export const getContacts = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // if (!req.user) {
        //     res.status(401).json({ message: 'User not authenticated' });
        //     return;
        // }




        const user = await UserModel.findById(req.user.userId)
            .populate('contacts', 'username email ');
        // if (!user) {
        //     throw new Error('user not found')

        // }
        // Add a null check for user
        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
            return;
        }
        res.status(StatusCodes.OK).json(user.contacts);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching contacts' });
    }
};

export const getContactById = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { id: userId } = req.params;
        const user = await UserModel.findById(req.user.userId);

        if (!user) {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'User not found' });
            return;
        }

        const contact = await UserModel.findById(userId)
            .select('username email bio');

        res.status(StatusCodes.OK).json(contact);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching contact' });
    }
};

export const searchContacts = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { query } = req.query;
        const users = await UserModel.find({
            $or: [
                { username: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        }).select('username email bio');

        res.status(StatusCodes.OK).json(users);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error searching contacts' });
    }
};

export const sendContactRequest = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { recipientId } = req.body;

        if (req.user.userId === recipientId) {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'Cannot send request to yourself' });
            return;
        }

        const request = await ContactRequestModel.create({
            sender: req.user.userId,
            recipient: recipientId
        });

        res.status(StatusCodes.CREATED).json(request);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error sending request' });
    }
};

export const getContactRequests = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const requests = await ContactRequestModel.find({
            recipient: req.user.userId,
            status: 'pending'
        }).populate('sender', 'username email');

        res.status(StatusCodes.OK).json(requests);
    } catch (error) {
        console.log(error);

        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching requests', error });
    }
};

export const handleContactRequest = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { requestId } = req.params;
        const { action } = req.body;

        const request = await ContactRequestModel.findById(requestId);

        if (!request || request.recipient.toString() !== req.user.userId) {
            res.status(StatusCodes.NOT_FOUND).json({ message: 'Request not found' });
            return;
        }

        if (action === 'accept') {
            await UserModel.findByIdAndUpdate(request.sender, {
                $addToSet: { contacts: request.recipient }
            });

            await UserModel.findByIdAndUpdate(request.recipient, {
                $addToSet: { contacts: request.sender }
            });

            request.status = 'accepted';
        } else {
            request.status = 'declined';
        }

        await request.save();
        res.status(StatusCodes.OK).json({ message: `Request ${action}ed successfully` });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error handling request' });
    }
};
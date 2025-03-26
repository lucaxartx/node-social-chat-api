import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import settings from '../config/settings';
import { blacklistedTokens } from '../controllers/user.controller';
import { extractToken } from '../utils/auth.utils';



export interface AuthRequest extends Request {
    // user: {
    //     id: string;
    //     username: string;
    //     email: string;
    // };
    user?: any
}


export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Use our new extractToken function
        const token = extractToken(req, res);

        // If no token was found, return an error
        if (!token) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'Please log in first'
            });
            return
        }

        // Check if this token has been logged out
        if (blacklistedTokens.includes(token)) {
            res.status(StatusCodes.UNAUTHORIZED).json({
                message: 'This session has expired. Please log in again'
            });
            return
        }

        // Verify the token is valid
        const decoded = jwt.verify(token, settings.JWT_SECRET_KEY) as { id: string }
        console.log('------decoded-----', decoded.id);
        console.log('------typeof decoded-----', typeof decoded);


        req.user = { userId: decoded.id }

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        console.log('Auth Middleware Error:', error);

        res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'Invalid login credentials'
        });
        return
    }
};



export default authMiddleware
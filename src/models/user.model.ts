import mongoose, { Schema, Document } from "mongoose";


export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    location?: string;
    bio?: string;
    profileImage?: string
    contacts: mongoose.Types.ObjectId[];
}

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        profileImage: { type: String },
        location: { type: String },
        bio: { type: String },
        contacts: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }]

    },
    { timestamps: true }
)


const UserModel = mongoose.model<IUser>('User', UserSchema);
export default UserModel;


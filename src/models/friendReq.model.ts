import mongoose from 'mongoose';

const contactRequestSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Prevent duplicate requests
contactRequestSchema.index({ sender: 1, recipient: 1 }, { unique: true });

export default mongoose.model('ContactRequest', contactRequestSchema);
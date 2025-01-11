import mongoose from "mongoose";

// 11. Notifications darsida qoldi boshidan boshlash kerak
const NotificationSchema = new mongoose.Schema({

    body: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

}, {timestamps: true})

const Notification = 
mongoose.models.Notification || 
mongoose.model("Notification", NotificationSchema)

export default Notification
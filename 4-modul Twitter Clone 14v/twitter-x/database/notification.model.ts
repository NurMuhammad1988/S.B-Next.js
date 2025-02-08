import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
    {
        body: String,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",//user.model.ts failiga jo'natildi yani bu holatda  bu NotificationSchema functionida yoziletgan bu user:{}object ichida type: mongoose.Schema.Types.ObjectId, bor va user.model.ts failoga ref qilingan yani ulangan 
        },
    },
    { timestamps: true }
);

const Notification =
    mongoose.models.Notification ||
    mongoose.model("Notification", NotificationSchema);

export default Notification;

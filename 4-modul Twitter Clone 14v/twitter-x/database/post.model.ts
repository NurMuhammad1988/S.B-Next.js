import mongoose from "mongoose";
import { string } from "zod";

const PostSchema = new mongoose.Schema({
    body: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],

    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
}, {timestamps: true});

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema)
export default Post
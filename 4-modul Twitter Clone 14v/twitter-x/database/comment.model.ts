import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
    {
        body: String,
        user: {//qaysi user tomonidan yozilganligi
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        post: {//qaysi postga comment yozilganligi
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },

        likes: [//postga comment yozilganda commentgaham like berish uchun User modeldan like bosadigan userni olish uchun ref bu adress
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

const Comment =
    mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
export default Comment;

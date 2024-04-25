const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,

    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        default: "https://firebasestorage.googleapis.com/v0/b/my-blog-app-5f804.appspot.com/o/plush-cinema-chair-cradling-an-engrossed-toddler-seen-from-behind-intimate-glow-from-the-empty-movi-851452898.png?alt=media&token=02e6a415-9704-4802-a0a2-255114299d33"
    },
    category: {
        type: String,
        default: "UNCATEGORIZED"
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
import mongoose, { Schema } from "mongoose";


const blogSchema = new Schema({
    blogTitle: { type: String, },
    blogDesc: { type: String },
    blogCategory: { type: String },
    blogImage: {type: String},
    userId: { type: String },
})


module.exports = mongoose.models.Blogs || mongoose.model('Blogs', blogSchema);
// import fs from 'fs';
// import imagekit from '../configs/imagekit.js';
// import Blog from '../models/Blog.js';

// export const addBlog = async (req, res) => {
//     try {
//         const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);

//         const imageFile = req.file;
//         if(!title || !description || !category || !imageFile){
//             return res.json({ success: false, message: "Title, description, category and image are required" });
//         }
//         const fileBuffer = fs.readFileSync(imageFile.path);

//         //uploading image to imagekit
//         const response = await imagekit.upload({
//             file: fileBuffer,
//             fileName: imageFile.originalname,
//             folder: "/blogs"
//         });

//         //optimization through imagekit url transformation
//         const optimizedImageUrl = imagekit.url({
//             src: response.url,
//             transformation: [
//                 {quality: 'auto'},
//                 {format: 'webp'},
//                 {width: '1280'},
//             ]
//         });


//         const image = optimizedImageUrl;
//         await Blog.create({
//             title,
//             subTitle,
//             description, 
//             image,
//             category,
//             isPublished
//         })
//         res.json({ success: true, message: "Blog added successfully" });
//     } catch (error) {
//         res.json({ success: false, message: error.message });
//     }
// };

import fs from 'fs';
import imagekit from '../configs/imagekit.js';
import { toFile } from '@imagekit/nodejs';
import Blog from '../models/blog.js';
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';



export const addBlog = async (req, res) => {
    try {

        const { title, subTitle, description, category, isPublished } =
            JSON.parse(req.body.blog);

        const imageFile = req.file;

        if (!title || !description || !category || !imageFile) {
            return res.json({
                success: false,
                message: "Title, description, category and image are required"
            });
        }

        const fileBuffer = fs.readFileSync(imageFile.path);

        // Convert buffer to ImageKit file
        const uploadedFile = await toFile(
            fileBuffer,
            imageFile.originalname
        );

        // Upload image
        const response = await imagekit.files.upload({
            file: uploadedFile,
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        // Optimized image URL
        const optimizedImageUrl = imagekit.helper.buildSrc({
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
            src: response.filePath,
            transformation: [
                {
                    quality: 80,
                    format: 'webp',
                    width: 1280,
                }
            ]
        });

        await Blog.create({
            title,
            subTitle,
            description,
            image: optimizedImageUrl,
            category,
            isPublished
        });

        res.json({
            success: true,
            message: "Blog added successfully"
        });

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({isPublished:true})
        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.json({ success: false, message: "Blog not found" });
        }
        res.json({ success: true, blog });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);
        //delete all comments associated with the blog
        await Comment.deleteMany({blog: id});
        res.json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const togglePublish= async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.json({
                success: false,
                message: "Blog not found"
            });
        }
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({ success: true, message: "Blog publish status toggled successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const addComment= async (req, res) => {
    try {
        const { blogId, name, content } = req.body;
        await Comment.create({
            blog: blogId,
            name,
            content
        });
        res.json({ success: true, message: "Comment added successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getBlogComments= async (req, res) => {
    try {
        const {blogId} = req.query;
        const comments = await Comment.find({blog: blogId, isApproved: true}).sort({ createdAt: -1 });
        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const generateContent=async (req, res) => {
    try{
        const { prompt } = req.body;
        const content = await main(prompt+' Generate a blog content for this topic in simple text format ');
        res.json({ success: true, content });
    }
    catch(error){
        res.json({ success: false, message: error.message });
    }
};

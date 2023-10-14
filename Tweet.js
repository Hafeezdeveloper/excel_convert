const express = require("express")
const tweetRouter = express.Router()
const fs = require('fs');
const multer  = require('multer');
const { uploadFile } = require("../Contollers/UploadFile");
const modelTweet = require("../Models/TweetSchema");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;



passport.use(
    new GoogleStrategy(
      {
        clientID: '774917999953-0beb2elcvfkqj9p8bqnv2jt3snas3sqs.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: 'http://localhost:5000/auth/google/callback', // Adjust this URL as needed
      },
         (token, tokenSecret, profile, done) => {
      // You can implement user creation and retrieval logic here.
      // Example: Check if the user exists in the database or create a new user.
      return done(null, profile);
    }
  )
);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'public/';

        // Check if the directory exists, if not, create it
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }

        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage })

tweetRouter.get("alltweet", upload.single('img') , async (req,res) =>{

    const img = await uploadFile(req.file)
    console.log(img)
    console.log(req.file)
    console.log(req.files)
    try {
        
    } catch (err) {
        console.log(err)
    }
})

tweetRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

tweetRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    // Successful authentication, redirect or send a response as needed.
    res.redirect('/dashboard'); // Redirect to a dashboard page
  });

// tweetRouter.get("/postTwet", async (req,res) =>{
//     try {
//         let finds = await modelTweet.find({
//             $or: [
//                 { count: { $lt: 1   } }, // Documents where count is greater than 2
//             ]
//         });
// console.log(finds)

//     } catch (err) {
//         console.log(err)
//     }
// })

// tweetRouter.get("/postTwet", async (req,res) =>{
//     try {
//         let finds = await modelTweet.find({
//             tweet:{
//                 //eleement match array ky ander only match krta h
//                 $elemMatch: { $gt: 0 , $lt:10  } , // Documents where count is greater than 2
//             }
//         });
// console.log(finds)

//     } catch (err) {
//         console.log(err)
//     }
// })

module.exports = tweetRouter
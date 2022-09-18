const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require('../../models/User')
require('../../models/Tweet')
const User = mongoose.model('User');
const Tweet = mongoose.model('Tweet');
const { requireUser } = require('../../config/passport');
const validateTweetInput = require('../../validation/tweets');


router.get('user/:userId', async(req,res,next)=> {
    let user;
    try {
        user = await User.findById(req.params.userId)
    } catch(_err) {
        const err = new Error('User not found');
        err.statusCode = 404;
        err.errors = {message: 'No user found with that id'};
        return next(err)
    }
    try {
        const tweets = await Tweet.find({ author:user._id }).sort({ createdAt:-1 }).populate('author', '_id, username')
        return res.json(tweets)
    }
    catch(_err) {
        return res.json([])
    }
})
router.get('/:id', async (req, res, next) => {
    try {
        const tweet = await Tweet.findById(req.params.id)
            .populate("author", "id, username");
        return res.json(tweet);
    }
    catch (_err) {
        const err = new Error('Tweet not found');
        err.statusCode = 404;
        err.errors = { message: "No tweet found with that id" };
        return next(err);
    }
})

router.post('/',
    requireUser,
    validateTweetInput,
    async (req, res, next) => {
        try {
            const newTweet = new Tweet({
                text: req.body.text,
                author: req.user._id
            });

            let tweet = await newTweet.save();
            tweet = await tweet.populate('author', '_id, username');
            return res.json(tweet);
        }
        catch (err) {
            next(err);
        }
    }
)

module.exports = router;
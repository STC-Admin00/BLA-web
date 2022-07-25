const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StorySchema = new Schema({
    storyTitle: {
        type: String,
        required: true,
        unique: true
    },
    storyURL: {
        type: String,
        required: true,
        unique: true
    },
    imageURL: {
        type: String,
        required: true,
        unique: true
    },
    audioURL: {
        type: String,
        required: false,
        unique: true
    },
    videoURL: {
        type: String,
        required: false,
        unique: true
    },
    author: {
        type: String,
        required: true
    },
    imageCarousel: {
        type: Array,
        default: []
    },
    storyTitleImage: {
        type: String,
        unique: true
    },
    hotIndicator: {
        type: String,
        required: false
    },
    newIndicator: {
        type: String,
        required: false
    },
    ncIndicator: {
        type: String,
        required: false
    },
    marquee: {
        type: String,
        required: false
    },
    category: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
        max: 60
    },
    pubDate: {
        type: String,
        default: Date.now()
    },
    genre: {
        type: String,
        required: true
    },
    comments: {
        type: Array,
        default: []
    },
    review: {
        type: String,
        required: false
    },
    likes: {
        type: Array,
        default: []
    },
    ratingData: {
        type: Number,
        default: 5
    },
    regId: {
        type: Number,
        required: true,
        unique: true,

    }
});



module.exports = Story = mongoose.model("stories", StorySchema);
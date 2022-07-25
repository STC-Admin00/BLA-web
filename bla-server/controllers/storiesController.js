const visitorData = {
    stories: require('../models/visitor/stories.json'),
    setStories: function (data) { this.stories = data }
}

const Story = require('../models/Story');

const getAllFiles = async (req, res) => {
    res.json(visitorData.stories);
}

const getAllStories = async (req, res) => {
// GET ALL STORY OBJECTS LIVE FROM THE DB
    const stories = await Story.find();
    if (!stories) return res.status(204).json({ 'message': 'No stories seem to be here.' });
    res.json(stories);
}

const createNewStory = async (req, res) => {
// CHECK TO VALIDATE STORY TITLE
    if (!req?.body?.storyTitle) {
        return res.status(400).json({ 'message': 'Story Title must be original.' });
    }
// CREATE NEW STORY OBJECT
    try {
        const result = await Story.create({
            storyTitle: req.body.storyTitle,
            storyURL: req.body.storyURL,
            imageURL: req.body.imageURL,
            audioURL: req.body.audioURL,
            videoURL: req.body.videoURL,
            author: req.body.author,
            imageCarousel: req.body.imageCarousel,
            storyTitleImage: req.body.storyTitleImage,
            hotIndicator: req.body.hotIndicator,
            newIndicator: req.body.newIndicator,
            ncIndicator: req.body.ncIndicator,
            marquee: req.body.marquee,
            category: req.body.category,
            desc: req.body.desc,
            pubDate: req.body.pubDate,
            genre: req.body.genre,
            regId: req.body.regId
        });
        res.status(201).json(result)
    } catch (err) {
        console.log(err)
    }
}

const updateStory = async (req, res) => {
// CHECK MONGODB ISSUED STORY ID
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'The ID entered is invalid.'});
}
// CREATE STORY OBJECT
    const story = await story.findOne({ _id: req.body.id }).exec();
    if (!story) {
        return res.status(204).json({ "message": `No story matches ID to ${req.body.storyTitle}`});
    }
    if (req.body?.storyTitle) story.storyTitle = req.body.storyTitle;
    if (req.body?.id) story.id = req.body.id;
    const result = await story.save();
    res.json(result);
}

const deleteStory = async (req, res) => {
// CHECK MONGODB ISSUED STORY ID
    if (!req.body?._id) return res.status(400).json({ 'message': 'Story ID required.'});
// CREATE STORY OBJECT
    const story = await Story.findOne({ _id: req.body._id }).exec();
    if (!story) {
        return res.status(204).json({ "message": `No Story matches ID for ${req.body.storyTitle}`});
    }
// DELETE THE STORY OBJECT
    const result = await story.deleteOne({ _id: req.body._id });
    res.json(result);
}

const getStory = async (req, res) => {
// CHECK FOR MONGODB ISSUED ID IN PARAMS
    if (!req?.params?.id) return res.status(400).json({ "message": 'Story ID must be provided.'});
// CREATE STORY OBJECT
const story = await Story.findOne({ _id: req.params.id }).exec();
if (!story) {
    return res.status(204).json({ "message": `No story matches the ID for ${req.body.storyTitle}`});
}
res.json(story);
}

module.exports = {
    getAllFiles,
    getAllStories,
    createNewStory,
    updateStory,
    deleteStory,
    getStory
}
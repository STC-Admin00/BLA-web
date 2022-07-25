const router = require("express").Router();
const storiesController = require('../../controllers/storiesController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(storiesController.getAllStories)
    .get(storiesController.getAllFiles)
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), storiesController.createNewStory)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor), storiesController.updateStory)
    .delete(verifyRoles(ROLES_LIST.Admin), storiesController.deleteStory)

router.route('/:id')
    .get(verifyRoles((ROLES_LIST.User)), storiesController.getStory)

module.exports = router;
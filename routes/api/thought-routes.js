const router = require('express').Router();

//thought routes
const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

//get all and post
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);
//get one, put and delete
router
    .route('/:id')
    .get(getOneThought)
    .put(updateThought)
    .delete(deleteThought);
//create reaction
router
    .route('/:thoughtId/reactions')
    .post(createReaction);
//delete reaction
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);

module.exports = router;
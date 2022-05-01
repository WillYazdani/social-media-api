const router = require('express').Router();
//user routes
const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/user-controller');

// get all and post
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);
// get one, put and delete
router
    .route('/:id')
    .get(getOneUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;
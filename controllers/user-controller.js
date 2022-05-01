const {user, thought} = require('../models/user');

const userController = {
    // GET all users
    getAllUsers: (req, res) => {
        user.find({}, (err, users) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(users);
            }
        });
    },
    // GET a user by id
    getUserById: (req, res) => {
        user.findById(req.params.id, (err, user) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(user);
            }
        });
    },
    // create a user
    createUser: (req, res) => {
        user.create(req.body, (err, user) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(user);
            }
        });
    },
    // update a user
    updateUser: (req, res) => {
        user.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(user);
            }
        });
    },
    // delete a user
    deleteUser: (req, res) => {
        user.findByIdAndRemove(req.params.id, (err, user) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(user);
            }
        });
    },
    // add friend
    addFriends: (req, res) => {
        user.findByIdAndUpdate(req.params.id, {$push: {friends: req.body}}, (err, user) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(user);
            }
        });
    },
    // delete friend
    deleteFriend: (req, res) => {
        user.findByIdAndUpdate(req.params.id, {$pull: {friends: req.body}}, (err, user) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(user);
            }
        });
    }
}

module.exports = userController;
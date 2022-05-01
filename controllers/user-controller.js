const {user, thought} = require('../models/user');

const userController = {
   //get all users
   getAllUsers(req, res) {
       user.find({})
       .populate({
              path: 'thoughts',
              select: '-__v'
         })
         .select('-__v')
         .sort({_id: -1})
         .then(dbUserData => res.json(dbUserData))
            .catch(err => {
               console.log(err);
               res.status(400).json(err);
            });
    },
    //get one user
    getOneUser(req, res) {
        user.findOne({_id: req.params.id})
        .populate({
               path: 'thoughts',
               select: '-__v'
          })
          .select('-__v')
          .then(dbUserData => {
             if(!dbUserData) {
                res.status(404).json({message: 'No user found with this id'});
                return;
             }
             res.json(dbUserData);
          })
          .catch(err => {
             console.log(err);
             res.status(400).json(err);
          });
    },
    //create a user
    createUser(req, res) {
        user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //update a user
    updateUser(req, res) {
        user.findOneAndUpdate({_id: req.params.id}, {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //delte a user
    deleteUser(req, res) {
        user.findOneAndDelete({_id: req.params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user found with this id'});
                return;
            }
            res.json(dbUserData);
        })
    }
}
   


module.exports = userController;
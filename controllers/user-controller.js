const {User} = require('../models');

const userController = {
    //get all users
    getAllUsers(req, res) {
        User.find({})
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
    getOneUser({params}, res) {
        User.findOne({_id: params.id})
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
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //update a user
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
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
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
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
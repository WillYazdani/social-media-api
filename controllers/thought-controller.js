const {Thought} = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
               path: 'user',
               select: '-__v'
          })
          .select('-__v')
          .sort({_id: -1})
          .then(dbThoughtData => res.json(dbThoughtData))
             .catch(err => {
                console.log(err);
                res.status(400).json(err);
             });
    },
    //get one thought
    getOneThought(req, res) {
        Thought.findOne({_id: req.params.id})
        .populate({
               path: 'user',
               select: '-__v'
          })
          .select('-__v')
          .then(dbThoughtData => {
              if(!dbThoughtData) {
                 res.status(404).json({message: 'No thought found with this id'});
                 return;
              }
              res.json(dbThoughtData);
          })
          .catch(err => {
              console.log(err);
              res.status(400).json(err);
          });
    },
    //create a thought
    createThought(req, res) {
        Thought.create({
            thought: req.body.thought,
            user: req.body.user
        })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate({_id: req.params.id}, {new: true, runValidators: true})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.id})
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //create reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.id},
            {$addToSet : {reactions: req.body.reaction}},
            {new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    //delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.id},
            {$pull : {reactions: req.body.reaction}},
            {new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'});
                return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
}

module.exports = thoughtController;
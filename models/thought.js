const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/date-format');

//add thought schema
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        trim: true,
        minLength: [1, 'Thought must be at least 1 character long'],
        maxLength: [280, 'Thought must be less than 280 characters long']
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: dateFormat
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
},
{
    toJSON : {
        virtuals: true,
        getters: true
    },
    id: false,
    timestamps: true
});
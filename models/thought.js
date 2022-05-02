const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//add reaction schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
        toJSON : {
            getters: true
        },
        id: false
});

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
        get: createdAtVal => dateFormat(createdAtVal)
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
});

//ThoughtSchema virtual
ThoughtSchema.virtial('reactionCount').get(function() {
    return this.reactions.length;
});

//Thought model
const Thought = model('Thought', ThoughtSchema);

//export
module.exports = Thought;
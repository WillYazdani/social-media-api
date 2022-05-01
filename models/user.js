const {Schema, model, Types} = require('mongoose');
const dateFormat = require('../utils/date-format');

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    friends: [this]
    },
    {
    
        toJSON : {
            virtuals: true,
            getters: true
        },
        id: false,
        timestamps: true
});

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
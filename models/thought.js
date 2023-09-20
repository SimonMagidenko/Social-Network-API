const { Schema, model, Types } = require('mongoose')
const moment = require('moment');


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timeStamp) => moment(timeStamp).format('MMMM Do YYYY')
        },
    },
);

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timeStamp) => moment(timeStamp).format('MMMM Do YYYY, h:mm:ss a'),

        },
        username:
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }
)

thoughtSchema.virtual('reactionCount').get(function () {
    if (this.reactions) {
        return this.reactions.length;
    }
    return 0
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
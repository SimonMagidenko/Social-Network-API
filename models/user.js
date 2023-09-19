const { Schema, model } = require('mongoose')


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            set: (value) => {
                return value.trim();
            }
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                isEmail: true,
            },
            thoughts:
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
            friends:
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            },
        },
    },
    {
        toJSON: { virtuals: true, },
        id: false
    }
)

userSchema.virtual('friendCount').get(() => {
    return this.friends.length;
});
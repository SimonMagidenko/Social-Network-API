const { Schema, model } = require('mongoose');
const validate = require('mongoose-validator')

const emailValidator = [
    validate({
        validator: 'isEmail',
        message: 'Please enter a Valid email address'
    })
]

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
            validate: emailValidator
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            }],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
            }],
    },
    {
        toJSON: { virtuals: true, },
        id: false
    }
)

userSchema.virtual('friendCount').get(() => {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    handle: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart'
    }
}, {
    timestamps: true
})

module.exports = User = mongoose.model('User', UserSchema);
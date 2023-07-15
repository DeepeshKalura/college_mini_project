const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Username is required'],
        ref: 'User',
    },
    title: {
        type: String,
        required: [true, 'Password is required'],
    },
    text: {
        type: String,
        required: [true, 'Password is required'],
    },
    completed: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
}
);

noteSchema.plugin(AutoIncrement, { inc_field: 'ticket', id: ticketNums, start_seq: 500 });

module.exports = mongoose.model('User', noteSchema);
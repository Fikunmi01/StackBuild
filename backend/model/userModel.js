const mongoose = require('mongoose')

const userSchema = mongoose.Schema({

    id: { type: Number, unique: true },
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: Number,
    imgSrc: String,
    dateJoined: {
        type: Date,
        default: new Date()
    },
    password: String,
    username: String,

})


userSchema.pre('save', async function (next) {
    const doc = this;

    try {
        const lastDoc = await mongoose.model('User', userSchema)
            .findOne({}, {}, { sort: { id: -1 } })
            .exec();

        // Set the id for the new document
        doc.id = lastDoc ? lastDoc.id + 1 : 1; // Generate a unique ID for the new user
        console.log('User Id:', doc.id);
        next(); // Proceed to save the document
    } catch (err) {
        return next(err); // Handle any errors
    }
});



const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel
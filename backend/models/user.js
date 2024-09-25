const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);

// unique: true:

// Database-level enforcement: Creates a unique index in MongoDB, preventing duplicate values at the database level.
// MongoDB will prevent duplicates from being stored, but you'll get a lower-level database error if a duplicate is attempted.
// mongoose-unique-validator:

// Application-level validation: Catches uniqueness violations before saving to the database and gives a more user-friendly validation error.
// This allows your application to handle the error gracefully and inform the user what went wrong.
// Example without mongoose-unique-validator:
// If you only use unique: true, Mongoose won't check for duplicates before saving the document. MongoDB will throw a more cryptic error like:

// MongoError: E11000 duplicate key error collection: db.users index: email_1 dup key
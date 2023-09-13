const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({ 
    email: {type: String, required: true, unique: true},
    password:  {type: String, required: true},
    role:  {type: String, required: true},
    addresses : {type: [Schema.Types.Mixed]},
    name:  {type: String, required: true},
    orders:  {type: [Schema.Types.Mixed]},
});

// This will tell that server need to return _id as id 
// virtuals is use to set fields in document
const virtual = userSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id
    }
});

exports.User = mongoose.model("User", userSchema);


const mongoose = require('mongoose');
const {Schema} = mongoose;

const productSchema = new Schema({ 
    title: {type: String, required: true, unique: true},
    description:  {type: String, required: true},
    price:  {type: Number,min:[0, "wrong min price"], max:[10000, 'wrong max price'] ,required: true}, 
    discountPercentage:  {type: Number,min:[0, "wrong min discount"], max:[99, 'wrong max discount']}, 
    rating:  {type: Number,min:[0, "wrong min rating"], max:[50, 'wrong max rating'] ,default: 0}, 
    stock:  {type: Number,min:[0, "wrong min stock"], max:[50, 'wrong max stock'] ,default: 0}, 
    brand:  {type: String, required: true},
    category: {type: String, required: true},
    thumbnail:  {type: String, required: true},
    images: {type: [String], required: true},
    deleted: {type: Boolean, default: false}
});

// This will tell that server need to return _id as id 
// virtuals is use to set fields in document
const virtual = productSchema.virtual('id');  
virtual.get(function(){
    return this._id;
})
productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function(doc, ret) {
        delete ret._id
    }
})

exports.Product = mongoose.model("Product", productSchema);


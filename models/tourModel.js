const mongoose = require('mongoose')

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour name is required'],
        unique: true,
        maxlength: [40, 'A tour name must have less than 40 characters'],
        minlength: [10, 'A tour name must have more or equal to 10 characters']
    },
    duration: {
        type: Number,
        required: [true, 'A tour duration is required']
    },
    ratingsAverage: {
        type: Number,
        default: 4.5,
        max: [5, 'Ratings should be below 5'],
        min: [1, 'Ratings must be above 0']
    },
    ratingsQuantity: {
        type: Number,
        default: 0
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty: {
        type: String,
        required: [true, 'A tour must have a difficulty'],
        enum: {
            values: ['easy', 'medium', 'difficult'],
            message: 'Difficulty can be either easy,medium or difficult'
        }
    },
    price: {
        type: Number,
        required: [true, 'A tour price is required']
    },
    priceDiscount: {
        type: Number,
        validate: {
            validator: function (val) {
                return val < this.price
            },
            message: 'Discount price must be below than regular price'
        }
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'A tour must have a description']
    },
    description: {
        type: String,
        trim: true
    },
    imageCover: {
        type: String,
        required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false
    },
    startDates: [Date],
    secretTour: {
        type: Boolean,
        default: false
    },
})

const Tour = mongoose.model('tour', tourSchema);
module.exports = Tour;
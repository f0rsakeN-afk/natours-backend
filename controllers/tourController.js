const catchAsync = require('../utils/catchAsync.js')
const appError = require('../utils/appError.js')
const Tour = require('../models/tourModel.js')
const APIFeatures = require('../utils/APIFeatures.js')


exports.createTour = catchAsync(async (req, res, next) => {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            tour: newTour
        }
    })
})


exports.getTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findById(req.params.id)
    if (!tour) {
        return next(new appError('No tour found with this id', 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
})


exports.getAllTours = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Tour.find(), req.query).filter().sort().limit().paginate();
    const tours = await features.query;
    res.status(200).json({
        status: 'success',
        data: {
            tours
        }
    })
})


exports.updateTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: true
    })
    if (!tour) {
        return next(new appError('No tour found with this id', 404
        ))
    }
    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
})


exports.deleteTour = catchAsync(async (req, res, next) => {
    const tour = await Tour.findByIdAndDelete(req.params.id)
    if (!tour) {
        return next(new appError('No tour found with this id', 404))
    }
    res.status(204).json({
        status: 'success',
        data: {
            null
        }
    })
})

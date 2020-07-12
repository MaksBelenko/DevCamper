const ErrorResponse = require('../utils/errorResponse');
const Bootcamp = require('../models/Bootcamp');

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public

exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find();

    res.status(200).json({
      success: true,
      count: bootcamps.length,
      data: bootcamps,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public

exports.getBootcamp = async (req, res, next) => {
  const id = req.params.id;

  try {
    const bootcamp = await Bootcamp.findById(id);

    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id ${id} in the database`, 404));
    }

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private

exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private

exports.updateBootcamp = async (req, res, next) => {
  try {
    const id = req.params.id;

    const bootcamp = await Bootcamp.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id ${id} in the database`, 404));
    }

    res.status(200).json({
      success: true,
      data: bootcamp,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private

exports.deleteBootcamp = async (req, res, next) => {
  try {
    const id = req.params.id;
    const bootcamp = await Bootcamp.findByIdAndDelete(id);

    if (!bootcamp) {
      return next(new ErrorResponse(`Bootcamp not found with id ${id} in the database`, 404));
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

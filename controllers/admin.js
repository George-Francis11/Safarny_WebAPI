const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');
const Admin = require('../models/admin');


module.exports.getAdmins = catchAsync(async (req, res, next) => {
    const admins = await Admin.find({});
    res.status(200).json({
        status: 'success',
        message: admins,
    });
});

module.exports.createAdmin = catchAsync(async (req, res, next) => {
    const admin = new Admin(req.body);
    admin.role = 'admin';
    await admin.save();
    res.status(200).json({
        status: 'success',
        message: 'Create a new admin',
    });
});
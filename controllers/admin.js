const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');
const Admin = require('../models/admin');


module.exports.getAdmins = catchAsync(async (req, res, next) => {
    const admins = await Admin.find({});
    //remove password from the response
    admins.forEach(admin => {
        admin.password = undefined;
    });
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

module.exports.showAdmin = catchAsync(async (req, res, next) => {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
        throw new ExpressError('Admin not found', 404);
    }
    res.status(200).json({
        status: 'success',
        message: admin,
    });
});

module.exports.deleteAdmin = catchAsync(async (req, res, next) => {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
        throw new ExpressError('Admin not found', 404);
    }
    res.status(200).json({
        status: 'success',
        message: 'Admin deleted successfully',
    });
});

module.exports.updateAdmin = catchAsync(async (req, res, next) => {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
        throw new ExpressError('Admin not found', 404);
    }
    await Admin.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
        status: 'success',
        message: 'Admin updated successfully',
    });
});
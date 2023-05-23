const catchAsync = require('../utilities/catchAsync');
const ExpressError = require('../utilities/ExpressError');
const Admin = require('../models/admin');
const { verifyJwt, createJwt } = require('../OAuth/jwt.controller');
const bcrypt = require('bcryptjs');


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
    const { name, email, password } = req.body.admin;
    const found_admin = await Admin.findOne({ email: email });
    if (found_admin) {
        throw new ExpressError('Admin already exists', 409);
    }
    else {
        const encryptedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({
            name: name,
            email: email,
            password: encryptedPassword,
            role: 'admin'
        });
        await admin.save();
        res.status(200).json({
            status: 'success',
            message: 'Admin created successfully',
        });
    }
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

module.exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ExpressError('Please provide email and password', 400);
    }
    const found_admin = await Admin.findOne({ email: email });
    if (!found_admin) {
        throw new ExpressError('Invalid email', 401);
    }
    const isMatch = await bcrypt.compare(password, found_admin.password);
    if (!isMatch) {
        throw new ExpressError('Invalid password', 401);
    }
    console.log("found admin", found_admin);
    const token = await createJwt(found_admin._id);
    console.log("token", token);
    res.status(200).json({
        status: 'success',
        message: token,
    });

});

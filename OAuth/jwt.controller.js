const jwt = require('jsonwebtoken');

module.exports.verifyJwt = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        return false;
    }
}

module.exports.createJwt = async (userId) => {
    const token = await jwt.sign({
        userId: userId
    }
        , process.env.JWT_SECRET, {
        expiresIn: '1h'
    });
    return token;
}
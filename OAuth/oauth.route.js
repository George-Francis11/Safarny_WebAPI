// oauth router with all the logic
// =============================================================================
var express = require('express');
var router = express.Router({ mergeParams: true });
const { generateToken,refreshToken } = require('./oauth.controller');

// router.route('/verify')
//     .post(verifyToken)

router.route('/refresh')
    .post(refreshToken)

router.route('/generate')
    .post(generateToken)

module.exports = router;
const express = require('express');
const router = express.Router();

const { isProduction } = require('../../config/keys');

if (!isProduction) {
    router.get("/restore", function (req, res) {
        const csrfToken = req.csrfToken();
        res.cookie("CSRF-TOKEN", csrfToken)
        res.status(200).json({
            'CSRF-Token':csrfToken
        });
    });
}
module.exports = router;

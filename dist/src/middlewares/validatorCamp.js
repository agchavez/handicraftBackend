"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { validationResult } = require('express-validator');
const validatorCamp = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
exports.default = validatorCamp;
//# sourceMappingURL=validatorCamp.js.map
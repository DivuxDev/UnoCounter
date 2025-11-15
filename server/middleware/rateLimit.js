const rateLimit = require('express-rate-limit');


const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100, 
    message: 'Demasiadas peticiones desde esta IP, por favor intente de nuevo más tarde.',
    standardHeaders: true, 
    legacyHeaders: false, 
});


const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 5, 
    message: 'Demasiados intentos de autenticación, por favor intente de nuevo más tarde.',
    standardHeaders: true,
    legacyHeaders: false,
});


const writeLimiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 10, 
    message: 'Demasiadas operaciones de escritura, por favor intente de nuevo más tarde.',
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    limiter,
    authLimiter,
    writeLimiter
};
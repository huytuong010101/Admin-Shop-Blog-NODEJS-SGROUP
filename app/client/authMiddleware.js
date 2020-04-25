const isAuth = (req, res, next) => {
    if (!req.session.user) return res.redirect('/login');
    return next();
};

const isNotAuth = (req, res, next) => {
    if (req.session.user) return res.redirect('/');
    return next();
};

module.exports = {
    isAuth,
    isNotAuth,
};

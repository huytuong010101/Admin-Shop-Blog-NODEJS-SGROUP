const isAuth = (req, res, next) => {
    if (!req.session.user) return res.redirect('/admin/user/login');
    return next();
};

const isNotAuth = (req, res, next) => {
    if (req.session.user) return res.redirect('/admin');
    return next();
};

module.exports = {
    isAuth,
    isNotAuth,
};

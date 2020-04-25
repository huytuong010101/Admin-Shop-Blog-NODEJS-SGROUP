const isSuperUser = (req, res, next) => (req.session.role === 'superuser' ? next() : res.render('permission-error'));
const isAdmin = (req, res, next) => (req.session.role === 'admin' ? next() : res.render('permission-error'));
const isClient = (req, res, next) => (req.session.role === 'client' ? next() : res.render('permission-error'));
const isAdminOrSuperuser = (req, res, next) => (req.session.role === 'admin' || req.session.role === 'superuser' ? next() : res.render('permission-error'));

module.exports = {
    isSuperUser,
    isAdmin,
    isClient,
    isAdminOrSuperuser,
};

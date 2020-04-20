const isSuperUser = (req, res, next) => {
    return req.session.role == "superuser" ? next() : res.send("Bạn không có quyền truy cập!");
}
const isAdmin = (req, res, next) => {
    return req.session.role == "admin" ? next() : res.send("Bạn không có quyền truy cập!");
}
const isClient = (req, res, next) => {
    return req.session.role == "client" ? next() : res.send("Bạn không có quyền truy cập!");
}
const isAdminOrSuperuser = (req, res, next) => {
    return req.session.role == "admin" || req.session.role == "superuser" ? next() : res.send("Bạn không có quyền truy cập!");
}

module.exports = {
    isSuperUser,
    isAdmin,
    isClient,
    isAdminOrSuperuser,
}
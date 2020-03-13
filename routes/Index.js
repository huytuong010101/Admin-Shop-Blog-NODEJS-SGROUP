var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  if (!req.session.user) {
    res.redirect("user/login")
  } else
    res.render("dashboard", { "user": req.session.user });
});
router.get('/basic-table', function (req, res, next) {
  if (!req.session.user) {
    res.redirect("user/login")
  } else
    res.render("basic-table", { "user": req.session.user });
});
router.get('/blank', function (req, res, next) {
  if (!req.session.user) {
    res.redirect("user/login")
  } else
    res.render("blank", { "user": req.session.user });
});
router.get('/dashboard', function (req, res, next) {
  if (!req.session.user) {
    res.redirect("user/login")
  } else
    res.render("dashboard", { "user": req.session.user });
});
router.get('/map-google', function (req, res, next) {
  if (!req.session.user) {
    res.redirect("user/login")
  } else
    res.render("map-google", { "user": req.session.user });
});
router.get('/profile', function (req, res, next) {
  if (!req.session.user) {
    res.redirect("user/login")
  } else
    res.render("profile", { "user": req.session.user });
});
router.get('/themifyicon', function (req, res, next) {
  if (!req.session.user) {
    res.redirect("user/login")
  } else
    res.render("themifyicon", { "user": req.session.user });
});



module.exports = router;

var mongoose = require("mongoose");
var passport = require("passport");
var User = require("../models/User");

var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
  res.render('index', { user : req.user });
};

// Go to registration page
userController.register = function(req, res) {
  res.render('register');
};

// Go to dashboard page 
userController.dashboard = function(req, res) {
  res.render('dashboard', { page_name : 'dashboard', user : req.user });
};

// Go to leaderboard page
userController.leaderboard = function(req, res) {
  res.render('leaderboard', { page_name : 'leaderboard', user : req.user });
};

// Go to wallet page 
userController.wallet = function(req, res) {
  res.render('wallet', { page_name : 'wallet', user : req.user });
};

// Go to news page 
userController.news = function(req, res) {
  res.render('news', { page_name: 'news', user : req.user });
};

// Go to market page 
userController.market = function(req, res) {
  res.render('market', { page_name: 'market', user : req.user });
};

// Go to list page
userController.list = function(req, res) {
  res.render('list', { page_name: 'list', user: req.user });
};

// Render seperate market pages
userController.btcmarket = function(req, res) {
  res.render('btcmarket', { page_name: 'market', user: req.user });
};
userController.usdtmarket = function(req, res) {
  res.render('usdtmarket', { page_name: 'market', user: req.user });
};
userController.neomarket = function(req, res) {
  res.render('neomarket', { page_name: 'market', user: req.user });
};
userController.funmarket = function(req, res) {
  res.render('funmarket', { page_name: 'market', user: req.user });
};
userController.ltcmarket = function(req, res) {
  res.render('ltcmarket', { page_name: 'market', user: req.user });
};

// Post registration
userController.doRegister = function(req, res) {
  User.register(new User({ username : req.body.username, name: req.body.name }), req.body.password, function(err, user) {
    if (err) {
      return res.render('register', { user : user });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('dashboard');
    });
  });
};

// Go to login page
userController.login = function(req, res) {
  res.render('login');
};

// Post login
userController.doLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    res.redirect('dashboard');
  });
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect('dashboard');
};

module.exports = userController;

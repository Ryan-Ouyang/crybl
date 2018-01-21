var express = require('express');
var router = express.Router();
var auth = require("../controllers/AuthController.js");

// restrict index for logged in user only
router.get('/', auth.home);

// route to list page
router.get('/list', auth.list);

// route to dashboard page
router.get('/dashboard', auth.dashboard);

// route to leaderboard page 
router.get('/leaderboard', auth.leaderboard);

// route to market page 
router.get('/market', auth.market);

// route to get sub-market pages
router.get('/btcmarket', auth.btcmarket)
router.get('/usdtmarket', auth.usdtmarket)
router.get('/neomarket', auth.neomarket)
router.get('/funmarket', auth.funmarket)
router.get('/ltcmarket', auth.ltcmarket)

// route to news
router.get('/news', auth.news);

//route to wallet page 
router.get('/wallet', auth.wallet);

// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

// route for logout action
router.get('/logout', auth.logout);

module.exports = router;

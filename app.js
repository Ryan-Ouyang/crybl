var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');
var getJSON = require('get-json');
var Coinmarketcap = require('node-coinmarketcap-api');
var coinmarketcap = new Coinmarketcap();
var binance = require('node-binance-api');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/node-auth')
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// make request to call for blockcypher API
//request("https://api.blockcypher.com/v1/eth/main").pipe(fs.createWriteStream("blockchain.json"));
//app.locals.blockchain = require('./blockchain.json');
getJSON('https://api.blockcypher.com/v1/eth/main', function(error, response){
    app.locals.blockcypher=(response)
})

getJSON('https://api.coinmarketcap.com/v1/ticker/?limit=100', function(error, response){
    app.locals.cmc=(response)
})

getJSON('https://api.coinmarketcap.com/v1/global/', function(error, response){
  app.locals.cmc2=(response)
})
//console.log(response);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// coinmarketcap api pull for list page
//(async () => {
  //let top_25 = await coinmarketcap.ticker(null, 'CAD', 25);
 // app.locals.cmc=(top_25)
//})();


binance.depth("ETHBTC", (error, depth, symbol) => {
  app.locals.btcdepth=(depth);
  //console.log(depth);
});
binance.depth("ETHUSDT", (error, depth, symbol) => {
	app.locals.usdtdepth=(depth);
});
binance.depth("LTCETH", (error, depth, symbol) => {
  app.locals.ltcdepth=(depth);
});
binance.depth("NEOETH", (error, depth, symbol) => {
  app.locals.neodepth=(depth);
});
binance.depth("FUNETH", (error, depth, symbol) => {
	app.locals.fundepth=(depth);
});


// passport configuration
var User = require('./models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

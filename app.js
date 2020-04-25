/* eslint-disable space-before-function-paren */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const methodOverride = require('method-override');
const flash = require('connect-flash-plus');
const Admin = require('./routes/Admin');
const Client = require('./routes/Client');
const Api = require('./routes/Api');
require('dotenv').config();

const app = express();
// overriding maethos
app.use(methodOverride('_method'));
// section setting
const options = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
};
const sessionStore = new MySQLStore(options);
app.set('trust proxy', 1);// trust first proxy
app.use(session({
	key: process.env.SESSION_KEY,
	secret: process.env.SESSION_SECRET,
	store: sessionStore,
	resave: false,
	saveUninitialized: false,
}));
app.use(flash());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
// eslint-disable-next-line object-curly-spacing
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', Admin);
app.use('/api', Api);
app.use('', Client);

// catch 404 and forward to error handler
// eslint-disable-next-line space-before-function-paren
app.use((req, res, next) => {
	next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;

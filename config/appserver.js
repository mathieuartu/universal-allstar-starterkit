//App specific
const options = {
  appName: 'Cinerank',
  dbName: 'cinerank',
  secretHash: 'cinecine'
};

//Modules
import colors from 'colors';
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import flash from 'connect-flash';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import qt from 'quickthumb';


//Server//Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/"+options.dbName);
var db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection failed"));

//Server config
var app = express();
app.use('/dist/',express.static('dist'));
app.use('/public/',express.static('public'));

//EJS
app.set('view engine', 'ejs');

//--Quickthumb
app.use(qt.static(__dirname + '/public/images/'));

//Express middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Passport configuration
require("./passport.js")(passport);

//Passport dependencies
app.use(session({
  secret: options.secretHash,
  saveUninitialized: true,
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



//--API Routes
require('./api/user.js')(app, passport);

// Universal rendering
import React from 'react';
import { renderToString, renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import App from '../js/components/app.jsx';

//Redux
import { Provider } from 'react-redux';
import { myappStore , updateUserInfo } from './redux/actions.js';

app.get('*', (req, res)=>{

  let markup;
  markup = renderToString(
    <Provider store={myappStore}>
      <StaticRouter context={{}} location={req.url}>
        <App/>
      </StaticRouter>
    </Provider>
  );
  return res.render('index', { markup });



  res.render('index');
});

//Launch server
app.listen(4001);
console.log("✔ "+options.appName+" server up and running".green.bold);


//-----------------Seed (Dev only)

var User =  require('./models/user.js'),
  UserObject = new User();
User.find({}).remove(function(){
    User.create({
        local:{
          username: "admin",
          password: UserObject.generateHash("admin")
        }
    });
});

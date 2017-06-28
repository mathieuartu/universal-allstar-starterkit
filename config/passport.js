var LocalStrategy = require("passport-local").Strategy,
  FacebookStrategy = require("passport-facebook").Strategy,
  GoogleStrategy = require("passport-google-oauth").OAuth2Strategy,

  config = require("./auth.js"),

  User = require("./models/user.js");

module.exports = function(passport){
  //--Required passport methods
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


  //--Passport google Strategy
  passport.use(new GoogleStrategy({
    clientID: config.googleAuth.consumerKey,
    clientSecret: config.googleAuth.consumerSecret,
    callbackURL: config.googleAuth.callbackURL
    },
    function(token, refreshToken, profile, done) {
      process.nextTick(function(){
        User.findOne({'google.id' : profile.id}, function(err, user){
          console.log(profile);
          if(err){
            return done(err);
          }

          if(user){
            return done(null, user);
          } else {
            var newUser = new User();
            // console.log(profile);

            newUser.google = {
              id: profile.id,
              token: token,
              name: profile.name.givenName +' '+ profile.name.familyName,
              email: profile.emails
            }

            newUser.save(function(err){
              if(err){
                throw err;
              }

              return done(null, newUser);

            });
          }
        });
      });
    }
  ));


  //--Passport Facebook Strategy
  passport.use(new FacebookStrategy({
      clientID: config.facebookAuth.clientID,
      clientSecret: config.facebookAuth.clientSecret,
      callbackURL: config.facebookAuth.callbackURL
    },
    function(token, refreshToken, profile, done){
      process.nextTick(function(){
        User.findOne({'facebook.id' : profile.id}, function(err, user){
          console.log(profile);
          if(err){
            return done(err);
          }

          if(user){
            return done(null, user);
          } else {
            var newUser = new User();

            newUser.facebook = {
              id: profile.id,
              token: token,
              name: profile.name.givenName +' '+ profile.name.familyName,
              email: profile.emails
            }

            newUser.save(function(err){
              if(err){
                throw err;
              }

              return done(null, newUser);

            });
          }
        });
      });
    }
  ));





  //--Passport local strategies
  //Local login Strategy
  passport.use("local-login", new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },function(req, username, password, done){
    process.nextTick(function(){
      User.findOne({'local.username': username}, function(err, user){
        if(err){
          return done(err);
        }
        if(!user){
          return done(null, false, {errorMessage: 'error:usernameNotFound'});
        } else {
          if(user.validPassword(password)){
            return done(null, user);
          } else {
            return done(null, false, {errorMessage: 'error:emailPasswordMatch'});
          }
        }
      });
    });
  }));

  //Local signup Strategy
  passport.use("local-signup", new LocalStrategy({
      //fieldName == <input name='fieldName'>
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, username, password, done){
      User.findOne({'local.username': username}, function(err, user){
        console.log('TRYING TO FIND USER');
      });
      process.nextTick(function(){
        User.findOne({'local.username': username}, function(err, user){
          if(err){
            return done(err);
          }

          if(user){
            //If user already exists >> Error
            return done(null, false, { errorMessage: 'error:userAlreadyExists'});
          } else {
            //If user does not exists, create one
            var newUser = new User();
            newUser.local = {
              username: username,
              password: newUser.generateHash(password)
            };

            //Save it
            newUser.save(function(err){
              if(err){
                throw err;
              } else {
                //And give it to passport so it can login
                return done(null, newUser);
              }
            });

          }
        });
      });
    }
  ));

};

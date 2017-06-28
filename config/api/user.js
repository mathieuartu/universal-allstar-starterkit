module.exports = function(app, passport){

  //----------------- USER --------------
  var User = require("../models/user.js");

  //-- User login / signup / verify / get info
  //Login verification
  var isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {
      res.json({error: true});
      return false;
    }
  };

  //Get info
  app.get("/api/user/info", isLoggedIn, function(req, res, next){
    res.json(req.user);
  });

  app.get('/api/users', function(req, res, next){
    User.find({}, function(err, users){
      res.json(users);
    })
  });

  //Example of passport protected api get route
  app.get("/api/user/movies", isLoggedIn, function(req, res, next){
    User.findById(req.user.id, function(err, user){
      if(user){
        res.json(user.ratedMovies);
      }
    });
  });

  app.get("/api/user/logout", function(req, res){
    req.logout();
    res.sendStatus(200);
  });

  //Login with custom passport callback
  app.post("/api/login", function(req, res, next){
    passport.authenticate("local-login", function(err, user, info){
      if(err){ return next(err) }

      if(!user){
        return res.json(info.errorMessage);
      } else {
        req.logIn(user, function(err){
          if (err) {
            return next(err);
          }
          return res.json(user);
        });
      }
    })(req, res, next);
  });


  //Example of passport protected api post route
  app.post("/api/user/deleteMovie", isLoggedIn, function(req, res){
    var ratingInfo = req.body;
    User.findById(req.user.id, function(err, user){
      if(movieIdExists(user.ratedMovies, ratingInfo.id)){
        //Delete movie rating
        console.log(user.ratedMovies[movieExistsArrayPosition]);
        user.ratedMovies.splice(movieExistsArrayPosition, 1);
      }
      user.save(function(err){
        if(!err){
          res.json(ratingInfo);
        }
      });
    });
  });

  //Signup with custom passport callback
  app.post("/api/signup", function(req, res, next){
    passport.authenticate("local-signup", function(err, user, info){
      //err -> db Error
      //user -> req.user
      //info -> auth error, contained in errorMessage
      // console.log(err, user, info);
      if(err){ return next(err) }

      //If !user, then the user already exists in the db
      if(!user){
        return res.json(info.errorMessage);
      } else {
        //User did not exist and therefore we created his account
        //Now log him in
        req.logIn(user, function(err) {
          if (err) {
            return next(err);
          }
          return res.json(user);
        });
      }
    })(req, res, next);
  });


  //-- Facebook login / signup
  //Go to facebook
  app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

  //For when facebook gets back to our app
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect : '/',
    failureRedirect: '/'
  }));

  //-- Google login / signup
  //Go to facebook
  app.get('/auth/google', passport.authenticate('google', { scope : 'https://www.googleapis.com/auth/plus.login' }));

  //For when google gets back to our app
  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect : '/',
    failureRedirect: '/'
  }));
}

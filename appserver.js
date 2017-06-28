/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.myappStore = exports.updateSearchQuery = exports.updateUserInfo = undefined;

var _redux = __webpack_require__(25);

//___DEFAULT APP STATE___
var defaultState = {
  user: {
    info: null
  },
  search: {
    query: null
  }

  //Actions
  //Define what info you will provide when you will dispatch the event
};var updateUserInfo = exports.updateUserInfo = function updateUserInfo(userInfo) {
  return {
    type: 'update_user_info',
    info: userInfo
  };
};

var updateSearchQuery = exports.updateSearchQuery = function updateSearchQuery(query) {
  return {
    type: 'update_search_query',
    query: query
  };
};

//Reducers
//Define what to do TO THE STATE with the info you provided when dispatching the action
//Each reducer var name will become a key in the global state

//___REDUCER___
var user = function user(state, action) {
  if (typeof state === 'undefined') return defaultState.user;

  switch (action.type) {
    //If user reducer received an update_user_info action, update the state accordingly
    case 'update_user_info':
      return Object.assign({}, state, {
        info: action.info
      });

    //Else, return the state
    default:
      return state;
  }
};

//___REDUCER___
var search = function search(state, action) {
  if (typeof state === 'undefined') return defaultState.search;
  switch (action.type) {
    case 'update_search_query':
      return Object.assign({}, state, {
        query: action.query
      });

    default:
      return state;
  }
};

//Store
var appStore = (0, _redux.combineReducers)({ user: user, search: search });
var myappStore = exports.myappStore = typeof window !== 'undefined' ? (0, _redux.createStore)(appStore, defaultState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) : (0, _redux.createStore)(appStore, defaultState);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//Dependencies
var mongoose = __webpack_require__(5),
    bcrypt = __webpack_require__(34);

//User schema
var userSchema = mongoose.Schema({
  //Whatever you want your user to have in db

  //Passport
  local: {
    username: String,
    password: String
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String
  }
});

// generating a hash
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema, 'User');

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//Global functions
var tools = {};

tools.xhr = function (o) {
  //XHR2 req
  var request = new XMLHttpRequest();
  request.open(o.type, o.url);
  var encoding = o.json ? 'application/json; charset=UTF-8' : 'application/x-www-form-urlencoded; charset=UTF-8';
  request.setRequestHeader("Content-Type", encoding);

  //XHR2 events
  var isLoading = false;
  var progress = function progress(e) {
    //Set global loading mode here
    if (!isLoading) {}
  };

  var load = function load(e) {
    if (e.target.readyState === 4) {
      o.success(e.target);
    }
  };

  request.addEventListener("progress", progress);
  request.addEventListener("load", load);

  if (o.json) {
    request.send(JSON.stringify(o.json));
  } else {
    request.send();
  }
};

tools.qsa = function (selector, context) {
  context = context || document;
  var elements = context.querySelectorAll(selector);
  return Array.prototype.slice.call(elements);
};

exports.default = tools;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(10);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

var _colors = __webpack_require__(11);

var _colors2 = _interopRequireDefault(_colors);

var _path = __webpack_require__(12);

var _path2 = _interopRequireDefault(_path);

var _express = __webpack_require__(13);

var _express2 = _interopRequireDefault(_express);

var _mongoose = __webpack_require__(5);

var _mongoose2 = _interopRequireDefault(_mongoose);

var _connectFlash = __webpack_require__(14);

var _connectFlash2 = _interopRequireDefault(_connectFlash);

var _morgan = __webpack_require__(15);

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = __webpack_require__(16);

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = __webpack_require__(17);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _expressSession = __webpack_require__(18);

var _expressSession2 = _interopRequireDefault(_expressSession);

var _passport = __webpack_require__(19);

var _passport2 = _interopRequireDefault(_passport);

var _quickthumb = __webpack_require__(20);

var _quickthumb2 = _interopRequireDefault(_quickthumb);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(21);

var _reactRouter = __webpack_require__(22);

var _app = __webpack_require__(23);

var _app2 = _interopRequireDefault(_app);

var _reactRedux = __webpack_require__(6);

var _actions = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//App specific
var options = {
  appName: 'Cinerank',
  dbName: 'cinerank',
  secretHash: 'cinecine'
};

//Modules


//Server//Connect to MongoDB
_mongoose2.default.connect("mongodb://localhost:27017/" + options.dbName);
var db = _mongoose2.default.connection;
db.on("error", console.error.bind(console, "Connection failed"));

//Server config
var app = (0, _express2.default)();
app.use('/dist/', _express2.default.static('dist'));
app.use('/public/', _express2.default.static('public'));

//EJS
app.set('view engine', 'ejs');

//--Quickthumb
app.use(_quickthumb2.default.static(__dirname + '/public/images/'));

//Express middlewares
app.use((0, _morgan2.default)('dev'));
app.use((0, _cookieParser2.default)());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use(_bodyParser2.default.json());

//Passport configuration
__webpack_require__(29)(_passport2.default);

//Passport dependencies
app.use((0, _expressSession2.default)({
  secret: options.secretHash,
  saveUninitialized: true,
  resave: true
}));
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());
app.use((0, _connectFlash2.default)());

//--API Routes
__webpack_require__(35)(app, _passport2.default);

// Universal rendering


//Redux


app.get('*', function (req, res) {

  var markup = void 0;
  markup = (0, _server.renderToString)(_react2.default.createElement(
    _reactRedux.Provider,
    { store: _actions.myappStore },
    _react2.default.createElement(
      _reactRouter.StaticRouter,
      { context: {}, location: req.url },
      _react2.default.createElement(_app2.default, null)
    )
  ));
  return res.render('index', { markup: markup });

  res.render('index');
});

//Launch server
app.listen(4001);
console.log("✔ " + options.appName + " server up and running".green.bold);

//-----------------Seed (Dev only)

var User = __webpack_require__(4),
    UserObject = new User();
User.find({}).remove(function () {
  User.create({
    local: {
      username: "admin",
      password: UserObject.generateHash("admin")
    }
  });
});
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("colors");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("connect-flash");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("morgan");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("cookie-parser");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("express-session");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("quickthumb");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(1);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(2);

var _header = __webpack_require__(24);

var _header2 = _interopRequireDefault(_header);

var _account = __webpack_require__(27);

var _account2 = _interopRequireDefault(_account);

__webpack_require__(28);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //React


//Router


//Components import


//Stylus


//_____________COMPONENT_____________
//Layout where every page component is rendered
var App = function (_React$Component) {
  _inherits(App, _React$Component);

  //Initial state
  function App(props) {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { id: 'react-app' },
        _react2.default.createElement(_header2.default, null),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/login', component: function component() {
            return _react2.default.createElement(_account2.default, { mode: 'login' });
          } }),
        _react2.default.createElement(_reactRouterDom.Route, { path: '/signup', component: function component() {
            return _react2.default.createElement(_account2.default, { mode: 'signup' });
          } })
      );
    }
  }]);

  return App;
}(_react2.default.Component);

exports.default = App;
;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(1);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(2);

var _reactRedux = __webpack_require__(6);

var _actions = __webpack_require__(3);

var _tools = __webpack_require__(7);

var _tools2 = _interopRequireDefault(_tools);

__webpack_require__(26);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Tools


//_____________COMPONENT_____________
//Global header
var Header = function (_React$Component) {
  _inherits(Header, _React$Component);

  function Header(props) {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).call(this, props));
  }

  _createClass(Header, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'header',
        null,
        _react2.default.createElement(
          'h1',
          null,
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/' },
            'Allstar Starterkit'
          )
        ),
        _react2.default.createElement(
          'nav',
          null,
          _react2.default.createElement(
            'ul',
            null,
            _react2.default.createElement(
              'li',
              null,
              _react2.default.createElement(
                'small',
                null,
                this.props.userInfo ? "Welcome " + this.props.userInfo.local.username : ''
              ),
              _react2.default.createElement(Menu, { userInfo: this.props.userInfo })
            )
          )
        )
      );
    }
  }]);

  return Header;
}(_react2.default.Component);

;

//Redux
function mapStateToProps(state) {
  return {
    userInfo: state.user.info
  };
}
exports.default = Header = (0, _reactRedux.connect)(mapStateToProps)(Header);

//_____________COMPONENT_____________
// Displays different account actions if user is logged in or not

var Menu = function (_React$Component2) {
  _inherits(Menu, _React$Component2);

  function Menu(props) {
    _classCallCheck(this, Menu);

    var _this2 = _possibleConstructorReturn(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

    _this2.state = { logoutSuccess: false };
    _this2.handleLogout = _this2.handleLogout.bind(_this2);
    return _this2;
  }

  _createClass(Menu, [{
    key: 'handleLogout',
    value: function handleLogout(e) {
      var _this3 = this;

      e.preventDefault();

      _tools2.default.xhr({
        type: "get",
        url: "/api/user/logout",
        success: function success(xhrThis) {
          _this3.setState({ logoutSuccess: true });
          _actions.myappStore.dispatch((0, _actions.updateUserInfo)(null));
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.props.userInfo != null) {
        return _react2.default.createElement(
          'div',
          { className: 'account-actions' },
          _react2.default.createElement(
            'a',
            { href: '/api/user/logout', onClick: this.handleLogout, className: 'boxed' },
            'logout'
          ),
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/account', className: 'boxed' },
            'account'
          ),
          this.state.logoutSuccess && _react2.default.createElement(_reactRouterDom.Redirect, { to: '/', push: true })
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'account-actions' },
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/login', className: 'boxed' },
            'Login'
          ),
          _react2.default.createElement(
            _reactRouterDom.Link,
            { to: '/signup', className: 'boxed' },
            'Create account'
          )
        );
      }
    }
  }]);

  return Menu;
}(_react2.default.Component);

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("redux");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(undefined);
// imports


// module
exports.push([module.i, "header h1 {\n  padding: 1rem 2rem;\n  background: #ea6060;\n}\nheader h1 a {\n  color: #fff;\n  text-decoration: none;\n}\nheader nav {\n  margin-top: 2rem;\n}\nheader nav ul {\n  list-style: none;\n}\nheader nav ul li a {\n  display: inline-block;\n  margin-right: 1rem;\n}\nheader nav ul .account-actions {\n  margin-top: 2rem;\n}\n", ""]);

// exports


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(1);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouterDom = __webpack_require__(2);

var _actions = __webpack_require__(3);

var _tools = __webpack_require__(7);

var _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Tools


//_____________COMPONENT_____________
// Login/Signup form
var LoginSignupForm = function (_React$Component) {
  _inherits(LoginSignupForm, _React$Component);

  function LoginSignupForm(props) {
    _classCallCheck(this, LoginSignupForm);

    var _this = _possibleConstructorReturn(this, (LoginSignupForm.__proto__ || Object.getPrototypeOf(LoginSignupForm)).call(this, props));

    _this.state = { success: false };
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  _createClass(LoginSignupForm, [{
    key: 'handleSubmit',
    value: function handleSubmit(e) {
      var _this2 = this;

      e.preventDefault();
      var credentials = {
        'username': e.target.querySelector('input[name=username]').value,
        'password': e.target.querySelector('input[name=password]').value
      };

      _tools2.default.xhr({
        type: "post",
        url: this.props.mode == 'login' ? "/api/login" : "/api/signup",
        json: credentials,
        success: function success(xhrThis) {
          var userInfo = JSON.parse(xhrThis.responseText);
          if (typeof userInfo != 'string') {
            _this2.setState({ success: true });
            _actions.myappStore.dispatch((0, _actions.updateUserInfo)(userInfo));
          } else {
            console.log(userInfo);
          }
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var welcomeText;
      if (this.props.mode == 'login') welcomeText = "Enter your login information";
      if (this.props.mode == 'signup') welcomeText = "Enter your desired username and password";
      return _react2.default.createElement(
        'div',
        { className: 'content_box' },
        _react2.default.createElement(
          'h2',
          null,
          welcomeText
        ),
        _react2.default.createElement(
          'form',
          { onSubmit: this.handleSubmit, method: 'post', action: '' },
          _react2.default.createElement('input', { name: 'username', type: 'text', placeholder: 'Username' }),
          _react2.default.createElement('input', { name: 'password', type: 'password', placeholder: 'Password' }),
          _react2.default.createElement(
            'button',
            null,
            'Ok'
          )
        ),
        this.state.success && _react2.default.createElement(_reactRouterDom.Redirect, { to: '/', push: true })
      );
    }
  }]);

  return LoginSignupForm;
}(_react2.default.Component);

exports.default = LoginSignupForm;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(8)(undefined);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Open+Sans);", ""]);

// module
exports.push([module.i, "html,\nbody,\ndiv,\nspan,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\nabbr,\naddress,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\nsamp,\nsmall,\nstrong,\nsub,\nsup,\nvar,\nb,\ni,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  background: transparent;\n  border: 0;\n  font-size: 100%;\n  margin: 0;\n  outline: 0;\n  padding: 0;\n  vertical-align: baseline;\n}\nbody {\n  line-height: 1;\n}\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\nnav ul {\n  list-style: none;\n}\nblockquote,\nq {\n  quotes: none;\n}\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: '';\n  content: none;\n}\na {\n  background: transparent;\n  font-size: 100%;\n  margin: 0;\n  padding: 0;\n  vertical-align: baseline;\n}\nins {\n  background-color: #ff9;\n  color: #000;\n  text-decoration: none;\n}\nmark {\n  background-color: #ff9;\n  color: #000;\n  font-style: italic;\n  font-weight: bold;\n}\ndel {\n  text-decoration: line-through;\n}\nabbr[title],\ndfn[title] {\n  border-bottom: 1px dotted;\n  cursor: help;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\nhr {\n  border: 0;\n  border-top: 1px solid #ccc;\n  display: block;\n  height: 1px;\n  margin: 1em 0;\n  padding: 0;\n}\ninput,\nselect {\n  vertical-align: middle;\n}\n.maxwidth {\n  box-sizing: border-box;\n  position: relative;\n  overflow: hidden;\n  margin: 0 auto;\n  width: 100%;\n  padding: 0 3%;\n  max-width: $maxWidth;\n}\nhtml {\n  font-size: 62.5%;\n}\nbody {\n  box-sizing: border-box;\n  padding: 2rem;\n  font: normal 1.6rem 'Open Sans', Helvetica, Arial, sans-serif;\n}\nbody a {\n  color: #ea6060;\n}\nbody input,\nbody button {\n  display: inline-block;\n  vertical-align: middle;\n  border: 1px solid #eee;\n  padding: 1rem;\n  margin: 1rem 1rem 0 0;\n}\n", ""]);

// exports


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var LocalStrategy = __webpack_require__(30).Strategy,
    FacebookStrategy = __webpack_require__(31).Strategy,
    GoogleStrategy = __webpack_require__(32).OAuth2Strategy,
    config = __webpack_require__(33),
    User = __webpack_require__(4);

module.exports = function (passport) {
  //--Required passport methods
  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  //--Passport google Strategy
  passport.use(new GoogleStrategy({
    clientID: config.googleAuth.consumerKey,
    clientSecret: config.googleAuth.consumerSecret,
    callbackURL: config.googleAuth.callbackURL
  }, function (token, refreshToken, profile, done) {
    process.nextTick(function () {
      User.findOne({ 'google.id': profile.id }, function (err, user) {
        console.log(profile);
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();
          // console.log(profile);

          newUser.google = {
            id: profile.id,
            token: token,
            name: profile.name.givenName + ' ' + profile.name.familyName,
            email: profile.emails
          };

          newUser.save(function (err) {
            if (err) {
              throw err;
            }

            return done(null, newUser);
          });
        }
      });
    });
  }));

  //--Passport Facebook Strategy
  passport.use(new FacebookStrategy({
    clientID: config.facebookAuth.clientID,
    clientSecret: config.facebookAuth.clientSecret,
    callbackURL: config.facebookAuth.callbackURL
  }, function (token, refreshToken, profile, done) {
    process.nextTick(function () {
      User.findOne({ 'facebook.id': profile.id }, function (err, user) {
        console.log(profile);
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, user);
        } else {
          var newUser = new User();

          newUser.facebook = {
            id: profile.id,
            token: token,
            name: profile.name.givenName + ' ' + profile.name.familyName,
            email: profile.emails
          };

          newUser.save(function (err) {
            if (err) {
              throw err;
            }

            return done(null, newUser);
          });
        }
      });
    });
  }));

  //--Passport local strategies
  //Local login Strategy
  passport.use("local-login", new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, username, password, done) {
    process.nextTick(function () {
      User.findOne({ 'local.username': username }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { errorMessage: 'error:usernameNotFound' });
        } else {
          if (user.validPassword(password)) {
            return done(null, user);
          } else {
            return done(null, false, { errorMessage: 'error:emailPasswordMatch' });
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
  }, function (req, username, password, done) {
    User.findOne({ 'local.username': username }, function (err, user) {
      console.log('TRYING TO FIND USER');
    });
    process.nextTick(function () {
      User.findOne({ 'local.username': username }, function (err, user) {
        if (err) {
          return done(err);
        }

        if (user) {
          //If user already exists >> Error
          return done(null, false, { errorMessage: 'error:userAlreadyExists' });
        } else {
          //If user does not exists, create one
          var newUser = new User();
          newUser.local = {
            username: username,
            password: newUser.generateHash(password)
          };

          //Save it
          newUser.save(function (err) {
            if (err) {
              throw err;
            } else {
              //And give it to passport so it can login
              return done(null, newUser);
            }
          });
        }
      });
    });
  }));
};

/***/ }),
/* 30 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("passport-facebook");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("passport-google-oauth");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  'facebookAuth': {
    'clientID': 'azeaze', // your App ID
    'clientSecret': 'azeaze', // your App Secret
    'callbackURL': 'http://localhost:4000/auth/facebook/callback'
  },

  'twitterAuth': {
    'consumerKey': 'azeaze',
    'consumerSecret': 'azeaze',
    'callbackURL': 'http://localhost:4000/auth/twitter/callback'
  },

  'googleAuth': {
    'consumerKey': 'azeaze',
    'consumerSecret': 'azeaze',
    'callbackURL': 'http://localhost:4000/auth/google/callback'
  }
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = require("bcrypt-nodejs");

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (app, passport) {

  //----------------- USER --------------
  var User = __webpack_require__(4);

  //-- User login / signup / verify / get info
  //Login verification
  var isLoggedIn = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.json({ error: true });
      return false;
    }
  };

  //Get info
  app.get("/api/user/info", isLoggedIn, function (req, res, next) {
    res.json(req.user);
  });

  app.get('/api/users', function (req, res, next) {
    User.find({}, function (err, users) {
      res.json(users);
    });
  });

  //Example of passport protected api get route
  app.get("/api/user/movies", isLoggedIn, function (req, res, next) {
    User.findById(req.user.id, function (err, user) {
      if (user) {
        res.json(user.ratedMovies);
      }
    });
  });

  app.get("/api/user/logout", function (req, res) {
    req.logout();
    res.sendStatus(200);
  });

  //Login with custom passport callback
  app.post("/api/login", function (req, res, next) {
    passport.authenticate("local-login", function (err, user, info) {
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.json(info.errorMessage);
      } else {
        req.logIn(user, function (err) {
          if (err) {
            return next(err);
          }
          return res.json(user);
        });
      }
    })(req, res, next);
  });

  //Example of passport protected api post route
  app.post("/api/user/deleteMovie", isLoggedIn, function (req, res) {
    var ratingInfo = req.body;
    User.findById(req.user.id, function (err, user) {
      if (movieIdExists(user.ratedMovies, ratingInfo.id)) {
        //Delete movie rating
        console.log(user.ratedMovies[movieExistsArrayPosition]);
        user.ratedMovies.splice(movieExistsArrayPosition, 1);
      }
      user.save(function (err) {
        if (!err) {
          res.json(ratingInfo);
        }
      });
    });
  });

  //Signup with custom passport callback
  app.post("/api/signup", function (req, res, next) {
    passport.authenticate("local-signup", function (err, user, info) {
      //err -> db Error
      //user -> req.user
      //info -> auth error, contained in errorMessage
      // console.log(err, user, info);
      if (err) {
        return next(err);
      }

      //If !user, then the user already exists in the db
      if (!user) {
        return res.json(info.errorMessage);
      } else {
        //User did not exist and therefore we created his account
        //Now log him in
        req.logIn(user, function (err) {
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
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

  //For when facebook gets back to our app
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/'
  }));

  //-- Google login / signup
  //Go to facebook
  app.get('/auth/google', passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

  //For when google gets back to our app
  app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/'
  }));
};

/***/ })
/******/ ]);
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = _interopRequireDefault(require("./config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Data =
/*#__PURE__*/
function () {
  function Data() {
    _classCallCheck(this, Data);
  }

  _createClass(Data, [{
    key: "api",
    value: function api(path) {
      var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'GET';
      var body = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var requiresAuth = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var credentials = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
      var url = _config["default"].apiBaseUrl + path;
      var options = {
        method: method,
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        }
      };

      if (body !== null) {
        options.body = JSON.stringify(body);
      }

      if (requiresAuth) {
        var encodedCredentials = btoa("".concat(credentials.username, ":").concat(credentials.password));
        options.headers['Authorization'] = "Basic ".concat(encodedCredentials);
      }

      return fetch(url, options);
    }
  }, {
    key: "getUser",
    value: function getUser(username, password) {
      var response;
      return regeneratorRuntime.async(function getUser$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return regeneratorRuntime.awrap(this.api("/users", 'GET', null, true, {
                username: username,
                password: password
              }));

            case 2:
              response = _context.sent;

              if (!(response.status === 200)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return", response.json().then(function (data) {
                return data;
              }));

            case 7:
              if (!(response.status === 401)) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", null);

            case 11:
              throw new Error();

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "createUser",
    value: function createUser(user) {
      var response;
      return regeneratorRuntime.async(function createUser$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.api('/users', 'POST', user));

            case 2:
              response = _context2.sent;

              if (!(response.status === 201)) {
                _context2.next = 7;
                break;
              }

              return _context2.abrupt("return", []);

            case 7:
              if (!(response.status === 400)) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt("return", response.json().then(function (data) {
                return data.errors;
              }));

            case 11:
              throw new Error();

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }]);

  return Data;
}();

exports["default"] = Data;
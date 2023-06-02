"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.updatePhoto = exports.logout = exports.loginUser = exports.deleteAccount = exports.createUser = exports.cleanAccount = exports._getAllUsers = void 0;
var _DataUser = require("../entitys/DataUser.js");
var _Semanas = require("../entitys/Semanas.js");
var _User = require("../entitys/User.js");
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _config = require("../config/config.js");
var _helpers = require("../utils/helpers.js");
var _helpers2 = require("../utils/types/helpers.js");
var _excluded = ["usuPassword"],
  _excluded2 = ["usuPassword"],
  _excluded3 = ["usuPassword"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var _getAllUsers = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var users;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _User.User.find({
            relations: {
              dataUser: true,
              semanas: {
                days: {
                  diarios: true
                }
              },
              frecuentes: true,
              ingresos: true
            }
          });
        case 3:
          users = _context.sent;
          return _context.abrupt("return", res.send(users));
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          return _context.abrupt("return", res.status(500).send({
            message: 'Error interno '
          }));
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function _getAllUsers(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports._getAllUsers = _getAllUsers;
var createUser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$file, _req$body, correo, contrasena, nombre, contrasenaConfirmada, _ref3, filename, encryptedPassword, dataUser, user, tokenObj, token, _, userWithoutPassword;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, correo = _req$body.correo, contrasena = _req$body.contrasena, nombre = _req$body.nombre, contrasenaConfirmada = _req$body.contrasenaConfirmada;
          if (!(!correo || !contrasena || !nombre || !contrasenaConfirmada)) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: 'Faltan datos'
          }));
        case 4:
          if (!(contrasena.length > 32 || correo.length < 8)) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: 'Datos inválidos'
          }));
        case 6:
          if (!(!correo.includes('@') || !correo.includes('.') || correo.length > 50)) {
            _context2.next = 8;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: 'Correo inválido'
          }));
        case 8:
          if (!(nombre.length > 70 || nombre.length < 3)) {
            _context2.next = 10;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: 'Nombre inválido'
          }));
        case 10:
          if (!(contrasena != contrasenaConfirmada)) {
            _context2.next = 12;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: 'Las contrasenas deben coincidir'
          }));
        case 12:
          // if (!req.file) {
          //   return res.status(400).json({ message: 'No hay archivo' })
          // }
          _ref3 = (_req$file = req.file) !== null && _req$file !== void 0 ? _req$file : {
            filename: 'default.png'
          }, filename = _ref3.filename;
          _context2.next = 15;
          return _bcrypt["default"].hash(contrasena, 10);
        case 15:
          encryptedPassword = _context2.sent;
          dataUser = _DataUser.DataUser.create({
            datName: nombre,
            datPhoto: filename
          });
          _context2.next = 19;
          return dataUser.save();
        case 19:
          user = _User.User.create({
            usuEmail: correo,
            usuPassword: encryptedPassword,
            dataUser: dataUser
          });
          _context2.next = 22;
          return user.save();
        case 22:
          tokenObj = {
            usuId: user.usuId,
            dataUser: {
              datId: dataUser.datId
            }
          };
          token = _jsonwebtoken["default"].sign(tokenObj, _config.SECRET);
          _ = user.usuPassword, userWithoutPassword = _objectWithoutProperties(user, _excluded);
          return _context2.abrupt("return", res.send({
            message: 'Usuario creado correctamente',
            user: userWithoutPassword,
            token: token
          }));
        case 28:
          _context2.prev = 28;
          _context2.t0 = _context2["catch"](0);
          console.log('error ->', _context2.t0);
          if (!(0, _helpers2.queryFailedGuard)(_context2.t0)) {
            _context2.next = 35;
            break;
          }
          if (!(_context2.t0.code === 'ER_DUP_ENTRY')) {
            _context2.next = 34;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: 'El correo ya está en uso'
          }));
        case 34:
          return _context2.abrupt("return", res.status(400).json({
            message: 'Datos inválidos'
          }));
        case 35:
          return _context2.abrupt("return", res.status(500).send({
            message: 'Error interno '
          }));
        case 36:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 28]]);
  }));
  return function createUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.createUser = createUser;
var loginUser = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var _req$body2, correo, contraseña, user, match, tokenObj, token, usuPassword, userWithoutPassword;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body2 = req.body, correo = _req$body2.correo, contraseña = _req$body2.contraseña;
          if (!(!correo || !contraseña)) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Faltan datos'
          }));
        case 4:
          if (!(contraseña.length > 32 || correo.length < 8)) {
            _context3.next = 6;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Datos inválidos'
          }));
        case 6:
          if (!(!correo.includes('@') || !correo.includes('.') || correo.length > 50)) {
            _context3.next = 8;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Correo inválido'
          }));
        case 8:
          _context3.next = 10;
          return _User.User.findOne({
            where: {
              usuEmail: correo
            },
            relations: {
              dataUser: true
            }
          });
        case 10:
          user = _context3.sent;
          if (user) {
            _context3.next = 13;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Correo o contraseña incorrectos'
          }));
        case 13:
          _context3.next = 15;
          return _bcrypt["default"].compare(contraseña, user.usuPassword);
        case 15:
          match = _context3.sent;
          if (match) {
            _context3.next = 18;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Correo o contraseña incorrectos'
          }));
        case 18:
          tokenObj = {
            usuId: user.usuId,
            dataUser: {
              datId: user.dataUser.datId
            }
          };
          token = _jsonwebtoken["default"].sign(tokenObj, _config.SECRET);
          usuPassword = user.usuPassword, userWithoutPassword = _objectWithoutProperties(user, _excluded2);
          return _context3.abrupt("return", res.send({
            message: 'Usuario logueado correctamente',
            user: userWithoutPassword,
            token: token
          }));
        case 24:
          _context3.prev = 24;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          return _context3.abrupt("return", res.status(500).send({
            message: 'Error interno '
          }));
        case 28:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 24]]);
  }));
  return function loginUser(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();
exports.loginUser = loginUser;
var updatePhoto = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var filename, rUser, userUpdated;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          if (req.file) {
            _context4.next = 3;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'No hay archivo'
          }));
        case 3:
          filename = req.file.filename;
          rUser = res.locals.user;
          if (rUser) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Sesión invalida'
          }));
        case 7:
          _context4.next = 9;
          return _User.User.findOne({
            where: {
              usuId: rUser.usuId
            },
            relations: {
              dataUser: true
            }
          });
        case 9:
          userUpdated = _context4.sent;
          if (userUpdated) {
            _context4.next = 13;
            break;
          }
          (0, _helpers.delFile)(filename);
          return _context4.abrupt("return", res.status(400).json({
            message: 'Sesión invalida'
          }));
        case 13:
          (0, _helpers.delFile)(userUpdated.dataUser.datPhoto);
          userUpdated.dataUser.datPhoto = filename;
          _context4.next = 17;
          return userUpdated.dataUser.save();
        case 17:
          return _context4.abrupt("return", res.send({
            message: 'Foto actualizada correctamente',
            filename: filename
          }));
        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          return _context4.abrupt("return", res.status(500).send({
            message: 'Error interno '
          }));
        case 24:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 20]]);
  }));
  return function updatePhoto(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();
exports.updatePhoto = updatePhoto;
var updateUser = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body3, name, newPassword, actualPassword, email, rUser, userFound, match, newPasswordHashed, updated, updated2, newUser, _, userWithoutPassword;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$body3 = req.body, name = _req$body3.name, newPassword = _req$body3.newPassword, actualPassword = _req$body3.actualPassword, email = _req$body3.email;
          if (!(!name || !newPassword || !actualPassword)) {
            _context5.next = 4;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Faltan datos (name)'
          }));
        case 4:
          // if (newPassword !== newPasswordConfirmed) {
          //   return res.status(400).json({ message: 'Las contraseñas no coinciden' })
          // }
          rUser = res.locals.user;
          if (rUser) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Sesión invalida'
          }));
        case 7:
          _context5.next = 9;
          return _User.User.findOne({
            where: {
              usuId: rUser.usuId
            },
            relations: {
              dataUser: true
            }
          });
        case 9:
          userFound = _context5.sent;
          if (userFound) {
            _context5.next = 12;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Sesión invalida'
          }));
        case 12:
          _context5.next = 14;
          return _bcrypt["default"].compare(actualPassword, userFound.usuPassword);
        case 14:
          match = _context5.sent;
          if (match) {
            _context5.next = 17;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Contraseña incorrecta'
          }));
        case 17:
          _context5.next = 19;
          return _bcrypt["default"].hash(newPassword, 10);
        case 19:
          newPasswordHashed = _context5.sent;
          _context5.next = 22;
          return _DataUser.DataUser.update({
            datId: rUser.dataUser.datId
          }, {
            datName: name
          });
        case 22:
          updated = _context5.sent;
          _context5.next = 25;
          return _User.User.update({
            usuId: rUser.usuId
          }, _objectSpread({
            usuPassword: newPasswordHashed
          }, email ? {
            usuEmail: email
          } : {}));
        case 25:
          updated2 = _context5.sent;
          _context5.next = 28;
          return _User.User.findOne({
            where: {
              usuId: rUser.usuId
            },
            relations: {
              dataUser: true
            }
          });
        case 28:
          newUser = _context5.sent;
          if (newUser) {
            _context5.next = 31;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Sesión invalida'
          }));
        case 31:
          _ = newUser.usuPassword, userWithoutPassword = _objectWithoutProperties(newUser, _excluded3);
          return _context5.abrupt("return", res.send({
            message: 'Usuario actualizado correctamente',
            user: userWithoutPassword
          }));
        case 35:
          _context5.prev = 35;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          return _context5.abrupt("return", res.status(500).send({
            message: 'Error interno'
          }));
        case 39:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 35]]);
  }));
  return function updateUser(_x9, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
exports.updateUser = updateUser;
var logout = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          return _context6.abrupt("return", res.status(200).json({
            message: 'Sesión cerrada'
          }));
        case 4:
          _context6.prev = 4;
          _context6.t0 = _context6["catch"](0);
          return _context6.abrupt("return", res.status(400).json({
            message: 'Error al cerrar sesión',
            e: _context6.t0
          }));
        case 7:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 4]]);
  }));
  return function logout(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();
exports.logout = logout;
var cleanAccount = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var rUser, semanas;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          rUser = res.locals.user;
          if (rUser) {
            _context7.next = 4;
            break;
          }
          return _context7.abrupt("return", res.status(400).json({
            message: 'Sesión invalida'
          }));
        case 4:
          _context7.next = 6;
          return _Semanas.Semanas.find({
            where: {
              user: {
                usuId: rUser.usuId
              }
            }
          });
        case 6:
          semanas = _context7.sent;
          _context7.next = 9;
          return _Semanas.Semanas.remove(semanas);
        case 9:
          return _context7.abrupt("return", res.status(200).json({
            message: 'Cuenta vaciada'
          }));
        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](0);
          return _context7.abrupt("return", res.status(400).json({
            message: 'Error al vaciar la cuenta',
            e: _context7.t0
          }));
        case 15:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 12]]);
  }));
  return function cleanAccount(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();
exports.cleanAccount = cleanAccount;
var deleteAccount = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var password, rUser, user, match;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          password = req.body.password;
          if (password) {
            _context8.next = 4;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            message: 'Faltan datos'
          }));
        case 4:
          rUser = res.locals.user;
          if (rUser) {
            _context8.next = 7;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            message: 'Sesión invalida'
          }));
        case 7:
          _context8.next = 9;
          return _DataUser.DataUser.findOne({
            where: {
              user: {
                dataUser: {
                  user: {
                    usuId: rUser.usuId
                  }
                }
              }
            },
            relations: {
              user: true
            }
          });
        case 9:
          user = _context8.sent;
          if (user) {
            _context8.next = 12;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            message: 'Sesión invalida'
          }));
        case 12:
          _context8.next = 14;
          return _bcrypt["default"].compare(password, user.user.usuPassword);
        case 14:
          match = _context8.sent;
          if (match) {
            _context8.next = 17;
            break;
          }
          return _context8.abrupt("return", res.status(400).json({
            message: 'Contraseña incorrecta'
          }));
        case 17:
          (0, _helpers.delFile)(user.datPhoto || '');
          _context8.next = 20;
          return user.remove();
        case 20:
          return _context8.abrupt("return", res.status(200).json({
            message: 'Cuenta eliminada'
          }));
        case 23:
          _context8.prev = 23;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
          return _context8.abrupt("return", res.status(400).json({
            message: 'Error al eliminar la cuenta',
            e: _context8.t0
          }));
        case 27:
        case "end":
          return _context8.stop();
      }
    }, _callee8, null, [[0, 23]]);
  }));
  return function deleteAccount(_x15, _x16) {
    return _ref9.apply(this, arguments);
  };
}();

// export const setProfile: HandleRequest<{
//   profile?: Profile
// }> = async (req, res) => {
//   try {
//     const { profile } = req.body
//     if (!profile) {
//       return res.status(400).json({ message: 'Faltan datos' })
//     }

//     const rUser = res.locals.user
//     if (!rUser) return res.status(400).json({ message: 'Sesión invalida' })

//     const user = await User.findOne({
//       where: {
//         usuId: rUser.usuId,
//       },
//     })

//     if (!user) {
//       return res.status(400).json({ message: 'Sesión invalida' })
//     }

//     user.usuProfile = profile

//     await user.save()

//     return res.status(200).json({ message: 'Perfil actualizado' })
//   } catch (e) {
//     console.log(e)
//     return res.status(400).json({ message: 'Error al actualizar el perfil', e })
//   }
// }
exports.deleteAccount = deleteAccount;
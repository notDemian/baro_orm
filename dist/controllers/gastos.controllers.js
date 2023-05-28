"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateGasto = exports.getSemanas = exports.getGastos = exports.getDay = exports.createGastoDiario = void 0;
var _DataUser = require("../entitys/DataUser.js");
var _Day = require("../entitys/Day.js");
var _Diarios = require("../entitys/Diarios.js");
var _Semanas = require("../entitys/Semanas.js");
var _User = require("../entitys/User.js");
var _userServices = require("../services/user.services.js");
var _axios = _interopRequireDefault(require("axios"));
var _moment = _interopRequireDefault(require("moment/moment.js"));
var _config = require("../config/config.js");
var _Dates = require("../utils/Dates.js");
var _controller = require("../utils/types/Day/controller.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } /* eslint-disable @typescript-eslint/no-unused-vars */ /* eslint-disable @typescript-eslint/no-empty-function */ /* eslint-disable indent */
var createGastoDiario = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var _req$body, nombre, desc, monto, icono, today, semStart, semEnd, Amount, rUser, user, ActualBalance, newBalance, finalDay, semanaFound, semanaCreated, semana, dayCreated, dayFound, _dayCreated, diario, resIA;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, nombre = _req$body.nombre, desc = _req$body.desc, monto = _req$body.monto, icono = _req$body.icono;
          _moment["default"].locale('es');
          today = (0, _moment["default"])().format(_Dates.FORMATS.SIMPLE_DATE);
          semStart = (0, _moment["default"])().startOf('week').format(_Dates.FORMATS.SIMPLE_DATE);
          semEnd = (0, _moment["default"])().endOf('week').format(_Dates.FORMATS.SIMPLE_DATE);
          if (!(!nombre || !desc || !monto || icono === null)) {
            _context.next = 8;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'Faltan datos'
          }));
        case 8:
          Amount = parseFloat(monto);
          if (!(isNaN(Amount) || Amount <= 0)) {
            _context.next = 11;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'Gasto invalido'
          }));
        case 11:
          rUser = res.locals.user;
          if (rUser) {
            _context.next = 14;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'Sesión invalida'
          }));
        case 14:
          _context.next = 16;
          return _User.User.findOneOrFail({
            where: {
              usuId: rUser.usuId
            },
            relations: {
              dataUser: true
            }
          });
        case 16:
          user = _context.sent;
          ActualBalance = user.dataUser.datBalance;
          newBalance = ActualBalance - Amount;
          if (!(ActualBalance < Amount)) {
            _context.next = 21;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'No tienes suficiente dinero'
          }));
        case 21:
          _context.next = 23;
          return _Semanas.Semanas.findOne({
            where: {
              semEnd: semEnd,
              semStart: semStart,
              user: {
                usuId: rUser.usuId
              }
            },
            relations: {
              days: true
            }
          });
        case 23:
          semanaFound = _context.sent;
          if (semanaFound) {
            _context.next = 35;
            break;
          }
          semanaCreated = _Semanas.Semanas.create({
            semEnd: semEnd,
            semStart: semStart,
            user: user
          });
          _context.next = 28;
          return semanaCreated.save();
        case 28:
          semana = _context.sent;
          dayCreated = _Day.Day.create({
            dayDate: today,
            semana: semana
          });
          _context.next = 32;
          return dayCreated.save();
        case 32:
          finalDay = _context.sent;
          _context.next = 44;
          break;
        case 35:
          dayFound = semanaFound.days.find(function (day) {
            return day.dayDate === today;
          });
          if (dayFound) {
            _context.next = 43;
            break;
          }
          _dayCreated = _Day.Day.create({
            dayDate: today,
            semana: semanaFound
          });
          _context.next = 40;
          return _dayCreated.save();
        case 40:
          finalDay = _context.sent;
          _context.next = 44;
          break;
        case 43:
          finalDay = dayFound;
        case 44:
          diario = _Diarios.Diarios.create({
            diaAmount: Amount,
            diaDescription: desc,
            diaIcon: icono,
            diaName: nombre,
            day: finalDay
          });
          _context.prev = 45;
          _context.next = 48;
          return _axios["default"].post("".concat(_config.API_IA_URL, "/api/classification/dia"), diario);
        case 48:
          resIA = _context.sent;
          console.log({
            data: resIA.data
          });
          if (resIA && resIA.data && resIA.data.classification) diario.diaCategory = resIA.data.classification;
          _context.next = 56;
          break;
        case 53:
          _context.prev = 53;
          _context.t0 = _context["catch"](45);
          console.log({
            err: _context.t0
          });
        case 56:
          _context.next = 58;
          return diario.save();
        case 58:
          user.dataUser.datBalance = newBalance;
          _context.next = 61;
          return user.dataUser.save();
        case 61:
          return _context.abrupt("return", res.status(200).json({
            message: 'Gasto creado',
            newBalance: newBalance
          }));
        case 64:
          _context.prev = 64;
          _context.t1 = _context["catch"](0);
          console.log(_context.t1);
          return _context.abrupt("return", res.status(500).json({
            message: 'Usuario no encontrado'
          }));
        case 68:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 64], [45, 53]]);
  }));
  return function createGastoDiario(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.createGastoDiario = createGastoDiario;
var getGastos = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var rUser, gastos;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          rUser = res.locals.user;
          if (rUser) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            message: 'Sesión invalida'
          }));
        case 4:
          _context2.next = 6;
          return _Diarios.Diarios.find({
            where: {
              day: {
                semana: {
                  user: {
                    usuId: rUser.usuId
                  }
                }
              }
            },
            relations: {
              day: true
            },
            order: {
              diaId: 'DESC'
            },
            take: 10
          });
        case 6:
          gastos = _context2.sent;
          return _context2.abrupt("return", res.status(200).json({
            message: 'Gastos obtenidos',
            gastos: gastos
          }));
        case 10:
          _context2.prev = 10;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            message: 'Error interno'
          }));
        case 14:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 10]]);
  }));
  return function getGastos(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.getGastos = getGastos;
var getSemanas = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var semana, semStart, semEnd, semanaStart, semanaEnd, rUser, semanaFound, dates, stadisticInfo, startDate, endDate, nextWeek, prevWeek, nextWeekFound, prevWeekFound, totalLastWeek, semId, _yield$Diarios$create, sum, finalDays, _loop, _i, _dates, _ret, totalWeek;
    return _regeneratorRuntime().wrap(function _callee3$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          semana = req.params.semana;
          _moment["default"].locale('es');
          semStart = (0, _Dates.getSemStart)().format(_Dates.FORMATS.SIMPLE_DATE);
          semEnd = (0, _Dates.getSemEnd)().format(_Dates.FORMATS.SIMPLE_DATE);
          semanaStart = (0, _Dates.getSemStart)(semana).format(_Dates.FORMATS.SIMPLE_DATE);
          semanaEnd = (0, _Dates.getSemEnd)(semana).format(_Dates.FORMATS.SIMPLE_DATE);
          rUser = res.locals.user;
          if (rUser) {
            _context4.next = 10;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Sesión invalida'
          }));
        case 10:
          _context4.next = 12;
          return _Semanas.Semanas.findOne({
            where: {
              semStart: semana && semana !== '' ? semanaStart : semStart,
              user: {
                usuId: rUser.usuId
              }
            },
            order: {
              semStart: 'DESC'
            },
            relations: {
              days: {
                diarios: true
              }
            }
          });
        case 12:
          semanaFound = _context4.sent;
          if (semanaFound) {
            _context4.next = 15;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'No hay semana'
          }));
        case 15:
          dates = [];
          stadisticInfo = {
            avgWeek: 0,
            vsLastWeek: 0,
            biggestExpense: 0
          };
          startDate = (0, _moment["default"])(semanaFound.semStart);
          endDate = (0, _moment["default"])(semanaFound.semEnd);
          while (startDate.diff(endDate) <= 0) {
            dates.push(startDate.format(_Dates.FORMATS.SIMPLE_DATE));
            startDate.add(1, 'days');
          }
          nextWeek = null;
          prevWeek = null;
          if (semana && semana !== '') {
            nextWeek = (0, _moment["default"])(semana).endOf('week').add(1, 'day').format(_Dates.FORMATS.SIMPLE_DATE);
            prevWeek = (0, _moment["default"])(semana).startOf('week').subtract(1, 'day').format(_Dates.FORMATS.SIMPLE_DATE);
          } else {
            nextWeek = (0, _Dates.getSemEnd)().add(1, 'day').format(_Dates.FORMATS.SIMPLE_DATE);
            prevWeek = (0, _Dates.getSemStart)().subtract(1, 'day').format(_Dates.FORMATS.SIMPLE_DATE);
          }
          _context4.next = 25;
          return _Semanas.Semanas.findOne({
            where: {
              semStart: nextWeek,
              user: {
                usuId: rUser.usuId
              }
            },
            order: {
              semStart: 'DESC'
            }
          });
        case 25:
          nextWeekFound = _context4.sent;
          _context4.next = 28;
          return _Semanas.Semanas.findOne({
            where: {
              semStart: prevWeek,
              user: {
                usuId: rUser.usuId
              }
            },
            order: {
              semStart: 'DESC'
            }
          });
        case 28:
          prevWeekFound = _context4.sent;
          nextWeek = nextWeekFound ? nextWeek : null;
          prevWeek = prevWeekFound ? prevWeek : null;
          totalLastWeek = 0;
          if (!prevWeekFound) {
            _context4.next = 40;
            break;
          }
          semId = prevWeekFound.semId;
          _context4.next = 36;
          return _Diarios.Diarios.createQueryBuilder('diarios').select('SUM(diarios.diaAmount)', 'sum').innerJoin('day', 'day').where('day.semanaSemId = :semId', {
            semId: semId
          }).getRawOne();
        case 36:
          _yield$Diarios$create = _context4.sent;
          sum = _yield$Diarios$create.sum;
          console.log({
            sum: sum,
            prevWeekFound: prevWeekFound
          });
          totalLastWeek = sum;
        case 40:
          finalDays = [];
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var _yield$Diarios$create2;
            var e, diafiltered, dayId, dayDate, dayTotal;
            return _regeneratorRuntime().wrap(function _loop$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  e = _dates[_i];
                  diafiltered = semanaFound.days.find(function (day) {
                    return day.dayDate === e;
                  });
                  if (diafiltered) {
                    _context3.next = 5;
                    break;
                  }
                  finalDays.push({
                    dayId: undefined,
                    dayDate: e,
                    dayTotal: 0
                  });
                  return _context3.abrupt("return", "continue");
                case 5:
                  dayId = diafiltered.dayId, dayDate = diafiltered.dayDate;
                  _context3.next = 8;
                  return _Diarios.Diarios.createQueryBuilder('diarios').select('SUM(diarios.diaAmount)', 'sum').where('diarios.dayDayId = :dayId', {
                    dayId: dayId
                  }).getRawOne();
                case 8:
                  _context3.t1 = _yield$Diarios$create2 = _context3.sent.sum;
                  _context3.t0 = _context3.t1 !== null;
                  if (!_context3.t0) {
                    _context3.next = 12;
                    break;
                  }
                  _context3.t0 = _yield$Diarios$create2 !== void 0;
                case 12:
                  if (!_context3.t0) {
                    _context3.next = 16;
                    break;
                  }
                  _context3.t2 = _yield$Diarios$create2;
                  _context3.next = 17;
                  break;
                case 16:
                  _context3.t2 = 0;
                case 17:
                  dayTotal = _context3.t2;
                  if (dayTotal > stadisticInfo.biggestExpense) stadisticInfo.biggestExpense = dayTotal;
                  finalDays.push({
                    dayId: dayId,
                    dayDate: dayDate,
                    dayTotal: dayTotal
                  });
                case 20:
                case "end":
                  return _context3.stop();
              }
            }, _loop);
          });
          _i = 0, _dates = dates;
        case 43:
          if (!(_i < _dates.length)) {
            _context4.next = 51;
            break;
          }
          return _context4.delegateYield(_loop(), "t0", 45);
        case 45:
          _ret = _context4.t0;
          if (!(_ret === "continue")) {
            _context4.next = 48;
            break;
          }
          return _context4.abrupt("continue", 48);
        case 48:
          _i++;
          _context4.next = 43;
          break;
        case 51:
          totalWeek = finalDays.reduce(function (acc, e) {
            if (e) return acc + e.dayTotal;
            return acc;
          }, 0);
          stadisticInfo.avgWeek = totalWeek / finalDays.length;
          stadisticInfo.vsLastWeek = totalLastWeek - totalWeek;
          console.log({
            finalDays: finalDays
          });
          return _context4.abrupt("return", res.status(200).json({
            message: 'semanas recuperadas exitosamente',
            finalDays: finalDays,
            actualWeek: semana && semana !== '' ? "".concat(semanaStart, " / ").concat(semanaEnd) : "".concat(semStart, " / ").concat(semEnd),
            nextWeek: nextWeek,
            prevWeek: prevWeek,
            stadisticInfo: stadisticInfo
          }));
        case 58:
          _context4.prev = 58;
          _context4.t1 = _context4["catch"](0);
          console.log(_context4.t1);
          return _context4.abrupt("return", res.status(500).json({
            message: 'Error interno'
          }));
        case 62:
        case "end":
          return _context4.stop();
      }
    }, _callee3, null, [[0, 58]]);
  }));
  return function getSemanas(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.getSemanas = getSemanas;
var getDay = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var _lastDayFound$diarios, day, rUser, Today, FormatDay, lastDay, nextDay, _yield$Promise$allSet, _yield$Promise$allSet2, dayFoundRes, lastDayFoundRes, nextDayFoundRes, dayFound, lastDayFound, nextDayFound, days, totalLastDay, totalToday, mostExpensiveCharge, diffDays, avgDay, byAmount, dayName;
    return _regeneratorRuntime().wrap(function _callee4$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          day = req.params.day;
          rUser = res.locals.user;
          if (rUser) {
            _context5.next = 5;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Sesión invalida'
          }));
        case 5:
          _moment["default"].locale('es');
          Today = (0, _moment["default"])(day);
          if (Today.isValid()) {
            _context5.next = 9;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Introduce una fecha válida'
          }));
        case 9:
          FormatDay = Today.format(_Dates.FORMATS.SIMPLE_DATE);
          lastDay = Today.subtract(1, 'day').format(_Dates.FORMATS.SIMPLE_DATE);
          nextDay = Today.add(2, 'day').format(_Dates.FORMATS.SIMPLE_DATE);
          _context5.next = 14;
          return Promise.allSettled([_Day.Day.findOne({
            where: {
              dayDate: FormatDay,
              semana: {
                user: {
                  usuId: rUser.usuId
                }
              }
            },
            relations: {
              diarios: true
            }
          }), _Day.Day.findOne({
            where: {
              dayDate: lastDay,
              semana: {
                user: {
                  usuId: rUser.usuId
                }
              }
            },
            relations: {
              diarios: true
            }
          }), _Day.Day.findOne({
            where: {
              dayDate: nextDay,
              semana: {
                user: {
                  usuId: rUser.usuId
                }
              }
            },
            relations: {
              diarios: true
            }
          })]);
        case 14:
          _yield$Promise$allSet = _context5.sent;
          _yield$Promise$allSet2 = _slicedToArray(_yield$Promise$allSet, 3);
          dayFoundRes = _yield$Promise$allSet2[0];
          lastDayFoundRes = _yield$Promise$allSet2[1];
          nextDayFoundRes = _yield$Promise$allSet2[2];
          if (!(dayFoundRes.status === 'rejected' || !dayFoundRes.value)) {
            _context5.next = 21;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Día no encontrado'
          }));
        case 21:
          dayFound = dayFoundRes.value;
          lastDayFound = lastDayFoundRes.status === 'fulfilled' ? lastDayFoundRes.value : null;
          nextDayFound = nextDayFoundRes.status === 'fulfilled' ? nextDayFoundRes.value : null;
          days = {
            lastDay: null,
            nextDay: null
          };
          totalLastDay = (_lastDayFound$diarios = lastDayFound === null || lastDayFound === void 0 ? void 0 : lastDayFound.diarios.reduce(function (acc, e) {
            if (e) return acc + e.diaAmount;
            return acc;
          }, 0)) !== null && _lastDayFound$diarios !== void 0 ? _lastDayFound$diarios : 0;
          totalToday = dayFound.diarios.reduce(function (acc, e) {
            if (e) return acc + e.diaAmount;
            return acc;
          }, 0);
          mostExpensiveCharge = 0;
          dayFound.diarios.forEach(function (day) {
            if (day.diaAmount > mostExpensiveCharge) mostExpensiveCharge = day.diaAmount;
          });
          diffDays = totalLastDay - totalToday;
          avgDay = !isNaN(totalToday / dayFound.diarios.length) ? totalToday / dayFound.diarios.length : 0;
          byAmount = [0, 0, 0, 0, 0];
          dayFound.diarios.forEach(function (day) {
            var amount = day.diaAmount;
            if (amount > 0 && amount <= _controller.LIMITS.LVL1) {
              byAmount[0]++;
            } else if (amount <= _controller.LIMITS.LVL2) {
              byAmount[1]++;
            } else if (amount <= _controller.LIMITS.LVL3) {
              byAmount[2]++;
            } else if (amount <= _controller.LIMITS.LVL4) {
              byAmount[3]++;
            } else {
              byAmount[4]++;
            }
          });

          // first capital letter dayname
          dayName = (0, _moment["default"])(FormatDay).format('dddd').replace(/^\w/, function (c) {
            return c.toUpperCase();
          });
          return _context5.abrupt("return", res.status(200).json({
            gastosDia: dayFound.diarios,
            avgDay: avgDay,
            diffDays: diffDays,
            mostExpensiveCharge: mostExpensiveCharge,
            byAmount: byAmount,
            days: days,
            dayName: dayName
          }));
        case 37:
          _context5.prev = 37;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            message: 'Error interno'
          }));
        case 41:
        case "end":
          return _context5.stop();
      }
    }, _callee4, null, [[0, 37]]);
  }));
  return function getDay(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.getDay = getDay;
var updateGasto = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var _req$body2, newDescripcion, newMonto, newIcono, newNombre, id, rUser, _yield$getBalance, _yield$getBalance2, datBalance, err, diarioFound, diaAmount, delta, newBalance, updatedDiario, updatedBalance;
    return _regeneratorRuntime().wrap(function _callee5$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _req$body2 = req.body, newDescripcion = _req$body2.newDescripcion, newMonto = _req$body2.newMonto, newIcono = _req$body2.newIcono, newNombre = _req$body2.newNombre, id = _req$body2.id;
          if (!(!newDescripcion || newMonto === undefined || newIcono === undefined || !newNombre || !id)) {
            _context6.next = 3;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'Faltan datos'
          }));
        case 3:
          if (!(newMonto <= 0)) {
            _context6.next = 5;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'Monto invalido'
          }));
        case 5:
          _context6.prev = 5;
          rUser = res.locals.user;
          if (rUser) {
            _context6.next = 9;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'Sesión invalida'
          }));
        case 9:
          _context6.next = 11;
          return (0, _userServices.getBalance)(rUser.usuId);
        case 11:
          _yield$getBalance = _context6.sent;
          _yield$getBalance2 = _slicedToArray(_yield$getBalance, 2);
          datBalance = _yield$getBalance2[0];
          err = _yield$getBalance2[1];
          if (!(datBalance === undefined)) {
            _context6.next = 17;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'Usuario no encontrado'
          }));
        case 17:
          _context6.next = 19;
          return _Diarios.Diarios.findOne({
            where: {
              diaId: id
            }
          });
        case 19:
          diarioFound = _context6.sent;
          if (diarioFound) {
            _context6.next = 22;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'No hay gasto'
          }));
        case 22:
          diaAmount = diarioFound.diaAmount;
          delta = diaAmount - newMonto;
          newBalance = datBalance + delta;
          if (!(newBalance < 0)) {
            _context6.next = 27;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'No puedes introducir esa cantidad'
          }));
        case 27:
          _context6.next = 29;
          return _Diarios.Diarios.update({
            diaId: id
          }, {
            diaDescription: newDescripcion,
            diaAmount: newMonto,
            diaIcon: newIcono,
            diaName: newNombre
          });
        case 29:
          updatedDiario = _context6.sent;
          if (updatedDiario.affected) {
            _context6.next = 32;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'No se pudo actualizar el gasto'
          }));
        case 32:
          _context6.next = 34;
          return _DataUser.DataUser.update({
            datId: rUser.dataUser.datId
          }, {
            datBalance: newBalance
          });
        case 34:
          updatedBalance = _context6.sent;
          if (updatedBalance.affected) {
            _context6.next = 37;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'No se pudo actualizar el balance'
          }));
        case 37:
          return _context6.abrupt("return", res.status(200).json({
            message: 'Gasto actualizado',
            newBalance: newBalance
          }));
        case 40:
          _context6.prev = 40;
          _context6.t0 = _context6["catch"](5);
          console.log(_context6.t0);
          return _context6.abrupt("return", res.status(500).json({
            message: 'Error en el servidor'
          }));
        case 44:
        case "end":
          return _context6.stop();
      }
    }, _callee5, null, [[5, 40]]);
  }));
  return function updateGasto(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.updateGasto = updateGasto;
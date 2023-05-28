"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCobrosFreq = exports.PUT_freq = exports.POST_freq = exports.GET_freq = exports.GET_ALL_freq = exports.DELETE_freq = void 0;
var _CobrosFreq = require("../entitys/CobrosFreq.js");
var _Day2 = require("../entitys/Day.js");
var _Frecuentes = require("../entitys/Frecuentes.js");
var _Semanas = require("../entitys/Semanas.js");
var _axios = _interopRequireDefault(require("axios"));
var _moment = _interopRequireDefault(require("moment/moment.js"));
var _config = require("../config/config.js");
var _Dates = require("../utils/Dates.js");
var _Numbers = require("../utils/Numbers.js");
var _helpers = require("../utils/helpers.js");
var _controller = require("../utils/types/Frecuentes/controller.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } /* eslint-disable @typescript-eslint/no-unused-vars */ /* eslint-disable @typescript-eslint/no-empty-function */ /* eslint-disable indent */
var POST_freq = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var rUser, _req$body, name, amount, lapse, description, isStatic, date, Today, today, startOfWeek, dayFound, todayEntity, semanaFound, endOfWeek, semanaCreated, insertSemanas, dayCreated, _dayCreated, freqCreated, resIA, insertFreq;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          rUser = res.locals.user;
          if (rUser) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'Sesión invalida'
          }));
        case 4:
          _req$body = req.body, name = _req$body.name, amount = _req$body.amount, lapse = _req$body.lapse, description = _req$body.description, isStatic = _req$body.isStatic, date = _req$body.date;
          if (!(!name || !amount || !lapse || !description || isStatic === undefined || name.trim() === '' || amount <= 0 || lapse.trim() === '')) {
            _context.next = 7;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'Datos incompletos'
          }));
        case 7:
          Today = (0, _moment["default"])(date);
          if (Today.isValid()) {
            _context.next = 10;
            break;
          }
          return _context.abrupt("return", res.status(400).json({
            message: 'Fecha no válida'
          }));
        case 10:
          today = Today.format(_Dates.FORMATS.SIMPLE_DATE);
          startOfWeek = (0, _Dates.getSemStart)().format(_Dates.FORMATS.SIMPLE_DATE);
          _context.next = 14;
          return _Day2.Day.findOne({
            relations: {
              semana: true
            },
            where: {
              dayDate: today,
              semana: {
                user: {
                  usuId: rUser.usuId
                }
              }
            }
          });
        case 14:
          dayFound = _context.sent;
          todayEntity = dayFound;
          if (dayFound) {
            _context.next = 40;
            break;
          }
          _context.next = 19;
          return _Semanas.Semanas.findOne({
            relations: {
              user: true
            },
            where: {
              semStart: startOfWeek,
              user: {
                usuId: rUser.usuId
              }
            }
          });
        case 19:
          semanaFound = _context.sent;
          if (semanaFound) {
            _context.next = 34;
            break;
          }
          endOfWeek = Today.endOf('week').format(_Dates.FORMATS.SIMPLE_DATE);
          _context.next = 24;
          return _Semanas.Semanas.create({
            semStart: startOfWeek,
            semEnd: endOfWeek,
            user: {
              usuId: rUser.usuId
            }
          });
        case 24:
          semanaCreated = _context.sent;
          _context.next = 27;
          return semanaCreated.save();
        case 27:
          insertSemanas = _context.sent;
          dayCreated = _Day2.Day.create({
            dayDate: today,
            semana: insertSemanas
          });
          _context.next = 31;
          return dayCreated.save();
        case 31:
          todayEntity = _context.sent;
          _context.next = 38;
          break;
        case 34:
          _dayCreated = _Day2.Day.create({
            dayDate: today,
            semana: semanaFound
          });
          _context.next = 37;
          return _dayCreated.save();
        case 37:
          todayEntity = _context.sent;
        case 38:
          _context.next = 41;
          break;
        case 40:
          todayEntity = dayFound;
        case 41:
          freqCreated = _Frecuentes.Frecuentes.create({
            freName: name,
            freDescription: description,
            freAmount: amount,
            freLapse: lapse,
            freIsStatic: isStatic,
            day: todayEntity,
            user: {
              usuId: rUser.usuId
            }
          });
          _context.prev = 42;
          _context.next = 45;
          return _axios["default"].post("".concat(_config.API_IA_URL, "/api/classification/freq"), freqCreated);
        case 45:
          resIA = _context.sent;
          console.log({
            data: resIA.data
          });
          if (resIA && resIA.data && resIA.data.classification) freqCreated.freCategory = resIA.data.classification;
          _context.next = 53;
          break;
        case 50:
          _context.prev = 50;
          _context.t0 = _context["catch"](42);
          console.log(_context.t0);
        case 53:
          _context.next = 55;
          return freqCreated.save();
        case 55:
          insertFreq = _context.sent;
          return _context.abrupt("return", res.status(201).json({
            message: 'Gasto creado',
            gasto: insertFreq
          }));
        case 59:
          _context.prev = 59;
          _context.t1 = _context["catch"](0);
          console.log(_context.t1);
          return _context.abrupt("return", res.status(500).json({
            message: 'Error al crear el gasto'
          }));
        case 63:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 59], [42, 50]]);
  }));
  return function POST_freq(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.POST_freq = POST_freq;
var GET_ALL_freq = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var rUser, frecuentesFound, _Day, proximos, notifications, _iterator, _step, freq, lastCobDate, cobroFound, lastCobDay, nextCob, daysTillNextCob, cobroCreated, nextCobDate, priorityColor;
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
          return _Frecuentes.Frecuentes.find({
            relations: {
              day: true
            },
            where: {
              user: {
                usuId: rUser.usuId
              }
            }
          });
        case 6:
          frecuentesFound = _context2.sent;
          _Day = (0, _moment["default"])();
          proximos = [];
          notifications = [];
          _iterator = _createForOfIteratorHelper(frecuentesFound);
          _context2.prev = 11;
          _iterator.s();
        case 13:
          if ((_step = _iterator.n()).done) {
            _context2.next = 33;
            break;
          }
          freq = _step.value;
          lastCobDate = freq.day.dayDate;
          _context2.next = 18;
          return _CobrosFreq.CobrosFreq.findOne({
            where: {
              frecuente: {
                freId: freq.freId
              }
            },
            order: {
              cobDate: 'DESC'
            }
          });
        case 18:
          cobroFound = _context2.sent;
          if (cobroFound) {
            lastCobDate = cobroFound.cobDate;
          }
          lastCobDay = (0, _moment["default"])(lastCobDate);
          nextCob = _controller.LAPSES_TO_INT[freq.freLapse](lastCobDay);
          daysTillNextCob = nextCob.diff(_Day, 'days') + 1;
          if (!(daysTillNextCob <= 0)) {
            _context2.next = 28;
            break;
          }
          cobroCreated = _CobrosFreq.CobrosFreq.create({
            cobDate: nextCob.format(_Dates.FORMATS.SIMPLE_DATE),
            frecuente: {
              freId: freq.freId
            }
          });
          _context2.next = 27;
          return cobroCreated.save();
        case 27:
          notifications.push("Se ha cobrado ".concat(freq.freName, " por $").concat(freq.freAmount));
        case 28:
          nextCobDate = nextCob.format(_Dates.FORMATS.SIMPLE_DATE);
          priorityColor = (0, _helpers.getPriorityColor)(daysTillNextCob);
          proximos.push(_objectSpread(_objectSpread({}, freq), {}, {
            nextCobDate: nextCobDate,
            daysTillNextCob: daysTillNextCob,
            priorityColor: priorityColor
          }));
        case 31:
          _context2.next = 13;
          break;
        case 33:
          _context2.next = 38;
          break;
        case 35:
          _context2.prev = 35;
          _context2.t0 = _context2["catch"](11);
          _iterator.e(_context2.t0);
        case 38:
          _context2.prev = 38;
          _iterator.f();
          return _context2.finish(38);
        case 41:
          return _context2.abrupt("return", res.status(200).json({
            message: 'Gastos frecuentes',
            frecuentes: frecuentesFound,
            proximos: proximos,
            notifications: notifications
          }));
        case 44:
          _context2.prev = 44;
          _context2.t1 = _context2["catch"](0);
          console.log(_context2.t1);
          return _context2.abrupt("return", res.status(500).json({
            message: 'Error al obtener los gastos'
          }));
        case 48:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 44], [11, 35, 38, 41]]);
  }));
  return function GET_ALL_freq(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
exports.GET_ALL_freq = GET_ALL_freq;
var GET_freq = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var id, rUser, freqFound;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          id = req.params.id;
          if (!(!id || !(0, _Numbers.isNumber)(id))) {
            _context3.next = 4;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Id no válido'
          }));
        case 4:
          rUser = res.locals.user;
          if (rUser) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(400).json({
            message: 'Sesión invalida'
          }));
        case 7:
          _context3.next = 9;
          return _Frecuentes.Frecuentes.findOne({
            relations: {
              day: true
            },
            where: {
              freId: id,
              user: {
                usuId: rUser.usuId
              }
            }
          });
        case 9:
          freqFound = _context3.sent;
          if (freqFound) {
            _context3.next = 12;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            message: 'Gasto frecuente no encontrado'
          }));
        case 12:
          return _context3.abrupt("return", res.status(200).json({
            message: 'Gasto frecuente',
            gasto: freqFound
          }));
        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          return _context3.abrupt("return", res.status(500).json({
            message: 'Error al obtener el gasto'
          }));
        case 19:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[0, 15]]);
  }));
  return function GET_freq(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
exports.GET_freq = GET_freq;
var PUT_freq = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, _req$body2, name, amount, lapse, description, rUser, freqFound;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          id = req.params.id;
          if (!(!id || !(0, _Numbers.isNumber)(id))) {
            _context4.next = 4;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Id no válido'
          }));
        case 4:
          _req$body2 = req.body, name = _req$body2.name, amount = _req$body2.amount, lapse = _req$body2.lapse, description = _req$body2.description;
          if (!(!name && !amount &&
          // !date &&
          !lapse)) {
            _context4.next = 7;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Sin datos'
          }));
        case 7:
          if (!(amount && !(0, _Numbers.isNumber)(amount))) {
            _context4.next = 9;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'El monto debe ser un número'
          }));
        case 9:
          if (!(lapse && lapse.trim() === '')) {
            _context4.next = 11;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'El lapso no debe estar vacío'
          }));
        case 11:
          if (!(name && name.trim() === '')) {
            _context4.next = 13;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'El nombre no debe estar vacío'
          }));
        case 13:
          rUser = res.locals.user;
          if (rUser) {
            _context4.next = 16;
            break;
          }
          return _context4.abrupt("return", res.status(400).json({
            message: 'Sesión invalida'
          }));
        case 16:
          _context4.next = 18;
          return _Frecuentes.Frecuentes.findOne({
            where: {
              freId: id,
              user: {
                usuId: rUser.usuId
              }
            },
            relations: {
              day: true
            }
          });
        case 18:
          freqFound = _context4.sent;
          if (freqFound) {
            _context4.next = 21;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            message: 'Gasto frecuente no encontrado'
          }));
        case 21:
          if (name) {
            freqFound.freName = name;
          }
          if (amount) {
            freqFound.freAmount = amount;
          }
          if (lapse) {
            freqFound.freLapse = lapse;
          }
          if (description) {
            freqFound.freDescription = description;
          }
          console.log({
            freqFound: freqFound
          });
          _context4.next = 28;
          return freqFound.save();
        case 28:
          return _context4.abrupt("return", res.status(200).json({
            message: 'Gasto frecuente',
            gasto: freqFound
          }));
        case 31:
          _context4.prev = 31;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);
          return _context4.abrupt("return", res.status(500).json({
            message: 'Error al obtener el gasto'
          }));
        case 35:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 31]]);
  }));
  return function PUT_freq(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
exports.PUT_freq = PUT_freq;
var DELETE_freq = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id, rUser, removedFreq;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          id = req.params.id;
          if (!(!id || !(0, _Numbers.isNumber)(id))) {
            _context5.next = 4;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Id no válido'
          }));
        case 4:
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
          return _Frecuentes.Frecuentes.createQueryBuilder('frecuentes')["delete"]().from(_Frecuentes.Frecuentes).where('freId = :id', {
            id: id
          }).execute();
        case 9:
          removedFreq = _context5.sent;
          if (!(removedFreq.affected === 0)) {
            _context5.next = 12;
            break;
          }
          return _context5.abrupt("return", res.status(400).json({
            message: 'Gasto no encontrado'
          }));
        case 12:
          return _context5.abrupt("return", res.status(200).json({
            message: 'Gasto frecuente eliminado',
            ok: true
          }));
        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](0);
          console.log(_context5.t0);
          return _context5.abrupt("return", res.status(500).json({
            message: 'Error al eliminar el gasto'
          }));
        case 19:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 15]]);
  }));
  return function DELETE_freq(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();
exports.DELETE_freq = DELETE_freq;
var getCobrosFreq = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var id, rUser, freqFound;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          id = req.params.id;
          if (!(!id || !(0, _Numbers.isNumber)(id))) {
            _context6.next = 4;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'Id no válido'
          }));
        case 4:
          rUser = res.locals.user;
          if (rUser) {
            _context6.next = 7;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            message: 'Sesión invalida'
          }));
        case 7:
          _context6.next = 9;
          return _Frecuentes.Frecuentes.findOne({
            relations: {
              cobros: true
            },
            where: {
              freId: id,
              user: {
                usuId: rUser.usuId
              }
            }
          });
        case 9:
          freqFound = _context6.sent;
          if (freqFound) {
            _context6.next = 12;
            break;
          }
          return _context6.abrupt("return", res.status(404).json({
            message: 'Gasto frecuente no encontrado'
          }));
        case 12:
          return _context6.abrupt("return", res.status(200).json({
            message: 'Cobros obtenidos',
            freq: freqFound
          }));
        case 15:
          _context6.prev = 15;
          _context6.t0 = _context6["catch"](0);
          console.log(_context6.t0);
          return _context6.abrupt("return", res.status(500).json({
            message: 'Error al obtener los cobros'
          }));
        case 19:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[0, 15]]);
  }));
  return function getCobrosFreq(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
exports.getCobrosFreq = getCobrosFreq;
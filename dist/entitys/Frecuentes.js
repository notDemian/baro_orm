"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Frecuentes = void 0;
var _typeorm = require("typeorm");
var _User = require("./User.js");
var _Day = require("./Day.js");
var _CobrosFreq = require("./CobrosFreq.js");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8;
function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }
function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }
var Frecuentes = (_dec = (0, _typeorm.Entity)({
  name: 'frecuentes'
}), _dec2 = (0, _typeorm.PrimaryGeneratedColumn)({
  name: 'freId',
  type: 'int'
}), _dec3 = (0, _typeorm.Column)({
  name: 'freName',
  type: 'varchar',
  length: 50
}), _dec4 = (0, _typeorm.Column)({
  name: 'freDescription',
  type: 'varchar',
  length: 150,
  nullable: true,
  "default": null
}), _dec5 = (0, _typeorm.Column)({
  name: 'freAmount',
  type: 'float'
}), _dec6 = (0, _typeorm.Column)({
  name: 'freLapse',
  type: 'varchar',
  length: 50
}), _dec7 = (0, _typeorm.ManyToOne)(function () {
  return _Day.Day;
}, function (day) {
  return day.frecuentes;
}, {
  cascade: true,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
}), _dec8 = (0, _typeorm.JoinColumn)(), _dec9 = (0, _typeorm.ManyToOne)(function () {
  return _User.User;
}, function (user) {
  return user.frecuentes;
}, {
  cascade: true,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
}), _dec10 = (0, _typeorm.JoinColumn)(), _dec11 = (0, _typeorm.OneToMany)(function () {
  return _CobrosFreq.CobrosFreq;
}, function (cobros) {
  return cobros.frecuente;
}, {
  cascade: true,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
}), _dec(_class = (_class2 = /*#__PURE__*/function (_BaseEntity) {
  _inherits(Frecuentes, _BaseEntity);
  var _super = _createSuper(Frecuentes);
  function Frecuentes() {
    var _this;
    _classCallCheck(this, Frecuentes);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _initializerDefineProperty(_assertThisInitialized(_this), "freId", _descriptor, _assertThisInitialized(_this));
    _initializerDefineProperty(_assertThisInitialized(_this), "freName", _descriptor2, _assertThisInitialized(_this));
    _initializerDefineProperty(_assertThisInitialized(_this), "freDescription", _descriptor3, _assertThisInitialized(_this));
    _initializerDefineProperty(_assertThisInitialized(_this), "freAmount", _descriptor4, _assertThisInitialized(_this));
    _initializerDefineProperty(_assertThisInitialized(_this), "freLapse", _descriptor5, _assertThisInitialized(_this));
    _initializerDefineProperty(_assertThisInitialized(_this), "day", _descriptor6, _assertThisInitialized(_this));
    _initializerDefineProperty(_assertThisInitialized(_this), "user", _descriptor7, _assertThisInitialized(_this));
    _initializerDefineProperty(_assertThisInitialized(_this), "cobros", _descriptor8, _assertThisInitialized(_this));
    return _this;
  }
  return _createClass(Frecuentes);
}(_typeorm.BaseEntity), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "freId", [_dec2], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "freName", [_dec3], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "freDescription", [_dec4], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "freAmount", [_dec5], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "freLapse", [_dec6], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "day", [_dec7, _dec8], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "user", [_dec9, _dec10], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
}), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "cobros", [_dec11], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: null
})), _class2)) || _class);
exports.Frecuentes = Frecuentes;
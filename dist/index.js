"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withStore = withStore;
exports.Store = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

var _React$createContext = _react.default.createContext(),
    Provider = _React$createContext.Provider,
    Consumer = _React$createContext.Consumer;

var Store =
/*#__PURE__*/
function (_React$Component) {
  _inherits(Store, _React$Component);

  function Store(props) {
    var _this;

    _classCallCheck(this, Store);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Store).call(this, props));

    var children = props.children,
        initState = _objectWithoutProperties(props, ["children"]);

    _this.state = initState;
    _this.dispatch = _this.dispatch.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.withDispatch = _this.withDispatch.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Store, [{
    key: "dispatch",
    value: function dispatch(namespace, updater, callback) {
      this.setState(function (state) {
        return _defineProperty({}, namespace, updater(state[namespace]));
      }, callback);
    }
  }, {
    key: "withDispatch",
    value: function withDispatch(action) {
      var _this2 = this;

      return function () {
        return action(_this2.dispatch).apply(void 0, arguments);
      };
    }
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(Provider, {
        value: {
          state: this.state,
          withDispatch: this.withDispatch
        }
      }, this.props.children);
    }
  }]);

  return Store;
}(_react.default.Component);

exports.Store = Store;

function withStore(propsMap, Component) {
  return (
    /*#__PURE__*/
    function (_React$Component2) {
      _inherits(WithStore, _React$Component2);

      function WithStore(props) {
        var _this3;

        _classCallCheck(this, WithStore);

        _this3 = _possibleConstructorReturn(this, _getPrototypeOf(WithStore).call(this, props));

        _this3.consumerChildren = function (_ref2) {
          var state = _ref2.state,
              withDispatch = _ref2.withDispatch;
          return _react.default.createElement(Component, _extends({}, _this3.props, propsMap(state), {
            withDispatch: withDispatch
          }));
        };

        return _this3;
      }

      _createClass(WithStore, [{
        key: "render",
        value: function render() {
          return _react.default.createElement(Consumer, {
            children: this.consumerChildren
          });
        }
      }]);

      return WithStore;
    }(_react.default.Component)
  );
}

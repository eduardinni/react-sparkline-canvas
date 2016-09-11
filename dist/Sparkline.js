(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-dom'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-dom'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactDom);
    global.Sparkline = mod.exports;
  }
})(this, function (exports, _react, _reactDom) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _reactDom2 = _interopRequireDefault(_reactDom);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Sparkline = function (_Component) {
    _inherits(Sparkline, _Component);

    function Sparkline() {
      _classCallCheck(this, Sparkline);

      return _possibleConstructorReturn(this, (Sparkline.__proto__ || Object.getPrototypeOf(Sparkline)).apply(this, arguments));
    }

    _createClass(Sparkline, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        switch (this.props.type) {
          case 'line':
            this.line(_reactDom2.default.findDOMNode(this));
            break;
          case 'step':
            this.step(_reactDom2.default.findDOMNode(this));
            break;
          case 'amp':
          case 'amplitude':
            this.amplitude(_reactDom2.default.findDOMNode(this));
            break;
          case 'refl':
          case 'reflected':
            this.reflected(_reactDom2.default.findDOMNode(this));
            break;
          default:
            this.line(_reactDom2.default.findDOMNode(this));
            break;
        }
      }
    }, {
      key: 'line',
      value: function line(canvas) {
        var ctx = canvas.getContext('2d');
        ctx.translate(0.5, 0.5); // pixel-perfect canvas
        var data = this.props.data;
        var dataMin = Math.min.apply(Math, _toConsumableArray(data));
        var dataMax = Math.max.apply(Math, _toConsumableArray(data).concat([Math.abs(dataMin)]));
        var baseY = dataMin < 0 ? this.props.height / 2 : this.props.height - this.props.padding;
        var ratioX = (this.props.width - this.props.padding * 2) / (data.length - 1);
        var ratioY = dataMin < 0 ? (baseY - this.props.padding) / dataMax : (baseY - this.props.padding) / dataMax;

        if (typeof this.props.strokeColor === 'string') {
          // Solid color
          ctx.strokeStyle = this.props.strokeColor;
          ctx.fillStyle = this.props.strokeColor;
        } else if (Array.isArray(this.props.strokeColor)) {
          // Extract single color when Array
          ctx.strokeStyle = this.props.strokeColor[0];
          ctx.fillStyle = this.props.strokeColor[0];
        } else if (_typeof(this.props.strokeColor) === 'object') {
          // Gradient color
          var gradient = this.props.gradDirection === 'row' ? ctx.createLinearGradient(0, 0, this.props.width, 0) : ctx.createLinearGradient(0, 0, 0, this.props.height);
          for (var key in this.props.strokeColor) {
            if (this.props.strokeColor.hasOwnProperty(key)) {
              gradient.addColorStop(key / 100, this.props.strokeColor[key]);
            }
          }
          ctx.strokeStyle = gradient;
          ctx.fillStyle = gradient;
        }

        // Stroke style
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = this.props.lineWidth;

        if (this.props.showMinMax) {
          ctx.beginPath();
          ctx.arc(this.props.padding, baseY - data[0] * ratioY, this.props.lineWidth, 0, 2 * Math.PI);
          ctx.fill();
          ctx.stroke();
        }

        var x = 0,
            y = 0;
        ctx.beginPath();
        for (var i = 0; i < data.length; i++) {
          x = i * ratioX + this.props.padding;

          if (dataMin < 0) {
            y = data[i] === 0 ? baseY : baseY - Math.abs(data[i]) * ratioY * (Math.abs(data[i]) / data[i]);
          } else {
            y = baseY - data[i] * ratioY;
          }

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        if (this.props.showMinMax) {
          ctx.beginPath();
          ctx.arc(x, y, this.props.lineWidth, 0, 2 * Math.PI);
          ctx.fill();
          ctx.stroke();
        }
      }
    }, {
      key: 'step',
      value: function step(canvas) {
        var ctx = canvas.getContext('2d');
        ctx.translate(0.5, 0.5); // pixel-perfect canvas
        var data = this.props.data;
        var dataMin = Math.min.apply(Math, _toConsumableArray(data));
        var dataMax = Math.max.apply(Math, _toConsumableArray(data).concat([Math.abs(dataMin)]));
        var baseY = dataMin < 0 ? this.props.height / 2 : this.props.height - this.props.padding;
        var ratioX = (this.props.width - this.props.padding * 2) / data.length;
        var ratioY = dataMin < 0 ? (baseY - this.props.padding) / dataMax : (baseY - this.props.padding) / dataMax;

        if (typeof this.props.strokeColor === 'string') {
          // Solid color
          ctx.strokeStyle = this.props.strokeColor;
          ctx.fillStyle = this.props.strokeColor;
        } else if (Array.isArray(this.props.strokeColor)) {
          // Extract single color when Array
          ctx.strokeStyle = this.props.strokeColor[0];
          ctx.fillStyle = this.props.strokeColor[0];
        } else if (_typeof(this.props.strokeColor) === 'object') {
          // Gradient color
          var gradient = this.props.gradDirection === 'row' ? ctx.createLinearGradient(0, 0, this.props.width, 0) : ctx.createLinearGradient(0, 0, 0, this.props.height);
          for (var key in this.props.strokeColor) {
            if (this.props.strokeColor.hasOwnProperty(key)) {
              gradient.addColorStop(key / 100, this.props.strokeColor[key]);
            }
          }
          ctx.strokeStyle = gradient;
          ctx.fillStyle = gradient;
        }

        // Stroke style
        ctx.lineCap = 'butt';
        ctx.lineWidth = this.props.lineWidth;

        if (this.props.showMinMax) {
          ctx.beginPath();
          ctx.arc(this.props.padding, baseY - data[0] * ratioY, this.props.lineWidth, 0, 2 * Math.PI);
          ctx.fill();
          ctx.stroke();
        }

        var x1 = 0,
            x2 = 0,
            y1 = 0,
            y2 = 0;
        ctx.beginPath();
        for (var i = 0; i < data.length; i++) {
          x1 = i * ratioX + this.props.padding;
          x2 = x1 + ratioX;

          if (dataMin < 0) {
            y1 = data[i] === 0 ? baseY : baseY - Math.abs(data[i]) * ratioY * (Math.abs(data[i]) / data[i]);
            y2 = data[i + 1] === 0 ? baseY : baseY - Math.abs(data[i + 1]) * ratioY * (Math.abs(data[i + 1]) / data[i + 1]);
          } else {
            y1 = baseY - data[i] * ratioY;
            y2 = baseY - data[i + 1] * ratioY;
          }

          if (i === 0) {
            ctx.moveTo(x1, y1);
          }

          ctx.lineTo(x2, y1);

          if (i < data.length) {
            ctx.lineTo(x2, y2);
          }
        }
        ctx.stroke();

        if (this.props.showMinMax) {
          ctx.beginPath();
          ctx.arc(x2, y1, this.props.lineWidth, 0, 2 * Math.PI);
          ctx.fill();
          ctx.stroke();
        }
      }
    }, {
      key: 'amplitude',
      value: function amplitude(canvas) {
        var ctx = canvas.getContext('2d');
        ctx.translate(0.5, 0.5); // pixel-perfect canvas
        var data = this.props.data;
        var maxH = this.props.height - this.props.padding * 2;
        var ratioY = maxH / Math.max.apply(Math, _toConsumableArray(data));

        if (this.props.baseline) {
          ctx.beginPath();
          ctx.lineCap = 'butt';
          ctx.lineWidth = this.props.lineWidth / 2;
          ctx.strokeStyle = this.props.baselineColor;
          ctx.moveTo(this.props.padding - this.props.lineWidth - 2.5, this.props.height / 2);
          ctx.lineTo(data.length * (this.props.lineWidth + 2.5) + this.props.padding, this.props.height / 2);
          ctx.stroke();
        }

        if (typeof this.props.strokeColor === 'string') {
          // Solid color
          ctx.strokeStyle = this.props.strokeColor;
          ctx.fillStyle = this.props.strokeColor;
        } else if (Array.isArray(this.props.strokeColor)) {
          // Extract single color when Array
          ctx.strokeStyle = this.props.strokeColor[0];
          ctx.fillStyle = this.props.strokeColor[0];
        } else if (_typeof(this.props.strokeColor) === 'object') {
          // Gradient color
          // Gradient color
          var gradient = this.props.gradDirection === 'row' ? ctx.createLinearGradient(0, 0, data.length * (this.props.lineWidth + 2.5) + this.props.padding, 0) : ctx.createLinearGradient(0, 0, 0, this.props.height);
          for (var key in this.props.strokeColor) {
            if (this.props.strokeColor.hasOwnProperty(key)) {
              gradient.addColorStop(key / 100, this.props.strokeColor[key]);
            }
          }
          ctx.strokeStyle = gradient;
          ctx.fillStyle = gradient;
        }

        // Stroke style
        ctx.lineCap = 'round';
        ctx.lineWidth = this.props.lineWidth;

        var x = 0,
            y = 0;
        for (var i = 0; i < data.length; i++) {
          if (data[i] <= 0) continue;

          ctx.beginPath();
          x = i * (this.props.lineWidth + 2.5) + this.props.padding;
          y = (maxH - data[i] * ratioY) / 2;
          ctx.moveTo(x, y + this.props.padding);
          ctx.lineTo(x, maxH - y + this.props.padding);
          ctx.stroke();
        }
      }
    }, {
      key: 'reflected',
      value: function reflected(canvas) {
        var ctx = canvas.getContext('2d');
        ctx.translate(0.5, 0.5); // pixel-perfect canvas
        var data = this.props.data;
        var ratioY = (this.props.height / 2 - this.props.padding * 2) / Math.max.apply(Math, _toConsumableArray(data));
        var mainColor, reflectionColor;

        if (Array.isArray(this.props.strokeColor)) {
          mainColor = this.props.strokeColor[0];
          reflectionColor = this.props.strokeColor[1];
        } else {
          mainColor = '#8c8c8c';
          reflectionColor = '#e6e6e6';
        }

        // Stroke style
        ctx.lineCap = 'butt';
        ctx.lineWidth = this.props.lineWidth;

        var x = 0,
            y = 0,
            baseY = this.props.height / 2;

        for (var i = 0; i < data.length; i++) {
          if (data[i] <= 0) continue;

          ctx.beginPath();
          ctx.strokeStyle = mainColor;
          x = i * (this.props.lineWidth + 2.5) + this.props.padding;
          y = baseY - (data[i] * ratioY + this.props.padding);

          ctx.moveTo(x, baseY);
          ctx.lineTo(x, y);
          ctx.stroke();

          ctx.beginPath();
          ctx.strokeStyle = reflectionColor;
          y = baseY + (data[i] * (ratioY * .5) + this.props.padding);
          ctx.moveTo(x, baseY + 2);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'canvas',
          { className: this.props.className, width: this.props.width, height: this.props.height },
          'Your browser does not support the HTML5 canvas tag.'
        );
      }
    }]);

    return Sparkline;
  }(_react.Component);

  Sparkline.propTypes = {
    data: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.number).isRequired,
    type: _react2.default.PropTypes.oneOf(['line', 'step', 'amp', 'amplitude', 'refl', 'reflected']),
    width: _react2.default.PropTypes.number.isRequired,
    height: _react2.default.PropTypes.number.isRequired,
    padding: _react2.default.PropTypes.number,
    className: _react2.default.PropTypes.string,
    lineWidth: _react2.default.PropTypes.number,
    strokeColor: _react2.default.PropTypes.oneOfType([_react2.default.PropTypes.string, _react2.default.PropTypes.object, _react2.default.PropTypes.array]),
    gradDirection: _react2.default.PropTypes.oneOf(['column', 'row']),
    showMinMax: _react2.default.PropTypes.bool,
    baseline: _react2.default.PropTypes.bool,
    baselineColor: _react2.default.PropTypes.string
  };

  Sparkline.defaultProps = {
    type: 'line',
    width: 200,
    height: 60,
    padding: 20,
    className: null,
    lineWidth: 3,
    strokeColor: '#000000',
    gradDirection: 'column',
    showMinMax: true,
    baseline: true,
    baselineColor: '#cccccc'
  };

  exports.default = Sparkline;
});
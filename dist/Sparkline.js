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
        this.sparkline(_reactDom2.default.findDOMNode(this));
      }
    }, {
      key: 'sparkline',
      value: function sparkline(canvas) {
        var ctx = canvas.getContext("2d");
        ctx.translate(0.5, 0.5); // pixel-perfect canvas
        var spark = this.props.dataPoints;
        var margin = 20;
        var ratioW = (this.props.width - margin * 2) * 1 / spark.length;
        var ratioH = (this.props.height - margin * 2) * 0.8 / Math.max.apply(Math, spark);

        var x = 0,
            y = 0;

        // Stroke gradient
        var grad = ctx.createLinearGradient(0, 0, this.props.width, this.props.height);
        grad.addColorStop(0, this.props.initialColor);
        grad.addColorStop(1, this.props.endColor);
        ctx.strokeStyle = grad;
        ctx.fillStyle = grad;

        // Stroke style
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.lineWidth = this.props.lineWidth;

        if (this.props.startMarker) {
          ctx.beginPath();
          ctx.arc(margin, this.props.height - (spark[0] * ratioH + margin), this.props.lineWidth, 0, 2 * Math.PI);
          ctx.fill();
          ctx.stroke();
        }

        ctx.beginPath();
        for (var index = 0; index < spark.length; index++) {
          x = index * ratioW + margin;
          y = this.props.height - (spark[index] * ratioH + margin);
          ctx.lineTo(x, y);
        }
        ctx.stroke();

        if (this.props.finalMarker) {
          ctx.beginPath();
          ctx.arc(x, y, this.props.lineWidth, 0, 2 * Math.PI);
          ctx.fill();
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
    dataPoints: _react2.default.PropTypes.array.isRequired,
    width: _react2.default.PropTypes.number,
    height: _react2.default.PropTypes.number,
    className: _react2.default.PropTypes.string,
    lineWidth: _react2.default.PropTypes.number,
    initialColor: _react2.default.PropTypes.string,
    endColor: _react2.default.PropTypes.string,
    startMarker: _react2.default.PropTypes.bool,
    finalMarker: _react2.default.PropTypes.bool
  };

  Sparkline.defaultProps = {
    dataPoints: [],
    width: null,
    height: null,
    className: null,
    lineWidth: 3,
    initialColor: '#000000',
    endColor: '#000000',
    startMarker: true,
    finalMarker: true
  };

  exports.default = Sparkline;
});
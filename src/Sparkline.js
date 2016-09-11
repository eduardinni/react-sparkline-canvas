import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Sparkline extends Component {
  componentDidMount() {
    switch(this.props.type) {
      case 'line':
        this.line(ReactDOM.findDOMNode(this));
        break;
      case 'step':
        this.step(ReactDOM.findDOMNode(this));
        break;
      case 'amp':
      case 'amplitude':
        this.amplitude(ReactDOM.findDOMNode(this));
        break;
      case 'refl':
      case 'reflected':
        this.reflected(ReactDOM.findDOMNode(this));
        break;
      default:
        this.line(ReactDOM.findDOMNode(this));
        break;
    }
  }

  line(canvas) {
    var ctx = canvas.getContext('2d');
    ctx.translate(0.5, 0.5); // pixel-perfect canvas
    var data = this.props.data;
    var dataMin = Math.min(...data);
    var dataMax = Math.max(...data, Math.abs(dataMin));
    var baseY = dataMin < 0 ? this.props.height / 2 : this.props.height - this.props.padding;
    var ratioX = (this.props.width - this.props.padding * 2) / (data.length - 1);
    var ratioY = dataMin < 0 ? (baseY - this.props.padding) / dataMax : (baseY - this.props.padding) / dataMax;

    if (typeof this.props.strokeColor === 'string') {
      // Solid color
      ctx.strokeStyle = this.props.strokeColor;
      ctx.fillStyle = this.props.strokeColor;
    }
    else if (Array.isArray(this.props.strokeColor)) {
      // Extract single color when Array
      ctx.strokeStyle = this.props.strokeColor[0];
      ctx.fillStyle = this.props.strokeColor[0];
    }
    else if (typeof this.props.strokeColor === 'object') {
      // Gradient color
      var gradient = this.props.gradDirection === 'row' ? ctx.createLinearGradient(0, 0, this.props.width, 0)
                                                        : ctx.createLinearGradient(0, 0, 0, this.props.height);
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

    var x = 0, y = 0;
    ctx.beginPath();
    for (var i = 0; i < data.length; i++) {
      x = i * ratioX + this.props.padding;

      if (dataMin < 0) {
        y = data[i] === 0 ? baseY : baseY - (Math.abs(data[i]) * ratioY * (Math.abs(data[i]) / data[i]));
      }
      else {
        y = baseY - data[i] * ratioY;
      }

      if (i === 0) {
        ctx.moveTo(x, y);
      }
      else {
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

  step(canvas) {
    var ctx = canvas.getContext('2d');
    ctx.translate(0.5, 0.5); // pixel-perfect canvas
    var data = this.props.data;
    var dataMin = Math.min(...data);
    var dataMax = Math.max(...data, Math.abs(dataMin));
    var baseY = dataMin < 0 ? this.props.height / 2 : this.props.height - this.props.padding;
    var ratioX = (this.props.width - this.props.padding * 2) / data.length;
    var ratioY = dataMin < 0 ? (baseY - this.props.padding) / dataMax : (baseY - this.props.padding) / dataMax;

    if (typeof this.props.strokeColor === 'string') {
      // Solid color
      ctx.strokeStyle = this.props.strokeColor;
      ctx.fillStyle = this.props.strokeColor;
    }
    else if (Array.isArray(this.props.strokeColor)) {
      // Extract single color when Array
      ctx.strokeStyle = this.props.strokeColor[0];
      ctx.fillStyle = this.props.strokeColor[0];
    }
    else if (typeof this.props.strokeColor === 'object') {
      // Gradient color
      var gradient = this.props.gradDirection === 'row' ? ctx.createLinearGradient(0, 0, this.props.width, 0)
                                                        : ctx.createLinearGradient(0, 0, 0, this.props.height);
      for (var key in this.props.strokeColor) {
        if (this.props.strokeColor.hasOwnProperty(key)) {
          gradient.addColorStop(key/100, this.props.strokeColor[key]);
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

    var x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    ctx.beginPath();
    for (var i = 0; i < data.length; i++) {
      x1 = i * ratioX + this.props.padding;
      x2 = x1 + ratioX;

      if (dataMin < 0) {
        y1 = data[i] === 0 ? baseY : baseY - (Math.abs(data[i]) * ratioY * (Math.abs(data[i]) / data[i]));
        y2 = data[i+1] === 0 ? baseY : baseY - (Math.abs(data[i+1]) * ratioY * (Math.abs(data[i+1]) / data[i+1]));
      }
      else {
        y1 = baseY - data[i] * ratioY;
        y2 = baseY - data[i+1] * ratioY;
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

  amplitude(canvas) {
    var ctx = canvas.getContext('2d');
    ctx.translate(0.5, 0.5); // pixel-perfect canvas
    var data = this.props.data;
    var maxH = this.props.height - this.props.padding * 2;
    var ratioY = maxH / Math.max(...data);

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
    }
    else if (Array.isArray(this.props.strokeColor)) {
      // Extract single color when Array
      ctx.strokeStyle = this.props.strokeColor[0];
      ctx.fillStyle = this.props.strokeColor[0];
    }
    else if (typeof this.props.strokeColor === 'object') {
      // Gradient color
      // Gradient color
      var gradient = this.props.gradDirection === 'row' ? ctx.createLinearGradient(0, 0, data.length * (this.props.lineWidth + 2.5) + this.props.padding, 0)
                                                        : ctx.createLinearGradient(0, 0, 0, this.props.height);
      for (var key in this.props.strokeColor) {
        if (this.props.strokeColor.hasOwnProperty(key)) {
          gradient.addColorStop(key/100, this.props.strokeColor[key]);
        }
      }
      ctx.strokeStyle = gradient;
      ctx.fillStyle = gradient;
    }

    // Stroke style
    ctx.lineCap = 'round';
    ctx.lineWidth = this.props.lineWidth;

    var x = 0, y = 0;
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

  reflected(canvas) {
    var ctx = canvas.getContext('2d');
    ctx.translate(0.5, 0.5); // pixel-perfect canvas
    var data = this.props.data;
    var ratioY = ((this.props.height / 2) - this.props.padding * 2) / Math.max(...data);
    var mainColor, reflectionColor;

    if(Array.isArray(this.props.strokeColor)) {
      mainColor = this.props.strokeColor[0];
      reflectionColor = this.props.strokeColor[1];
    }
    else {
      mainColor = '#8c8c8c';
      reflectionColor = '#e6e6e6';
    }

    // Stroke style
    ctx.lineCap = 'butt';
    ctx.lineWidth = this.props.lineWidth;

    var x = 0, y = 0, baseY = this.props.height / 2;

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

  render(){
    return (
      <canvas className={this.props.className} width={this.props.width} height={this.props.height}>
        Your browser does not support the HTML5 canvas tag.
      </canvas>
    );
  }
}

Sparkline.propTypes = {
  data:             React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
  type:             React.PropTypes.oneOf(['line', 'step', 'amp', 'amplitude', 'refl', 'reflected']),
  width:            React.PropTypes.number.isRequired,
  height:           React.PropTypes.number.isRequired,
  padding:          React.PropTypes.number,
  className:        React.PropTypes.string,
  lineWidth:        React.PropTypes.number,
  strokeColor:      React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.object, React.PropTypes.array]),
  gradDirection:    React.PropTypes.oneOf(['column', 'row']),
  showMinMax:       React.PropTypes.bool,
  baseline:         React.PropTypes.bool,
  baselineColor:    React.PropTypes.string,
}

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
  baselineColor: '#cccccc',
}

export default Sparkline;

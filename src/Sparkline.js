import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Sparkline extends Component {
  componentDidMount() {
    this.sparkline(ReactDOM.findDOMNode(this));
  }

  sparkline(canvas) {
    var ctx = canvas.getContext("2d");
    ctx.translate(0.5, 0.5); // pixel-perfect canvas
    var spark = this.props.dataPoints;
    var margin = 20;
    var ratioW = ((this.props.width - margin * 2) * 1) / spark.length;
    var ratioH = ((this.props.height - margin * 2) * 0.8) / Math.max.apply(Math, spark);

    var x = 0, y = 0;

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

    if(this.props.startMarker) {
      ctx.beginPath();
      ctx.arc(margin, this.props.height - ( spark[0] * ratioH + margin ), this.props.lineWidth, 0, 2 * Math.PI);
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

    if(this.props.finalMarker) {
      ctx.beginPath();
      ctx.arc(x, y, this.props.lineWidth, 0, 2 * Math.PI);
      ctx.fill();
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
  dataPoints:   React.PropTypes.array.isRequired,
  width:        React.PropTypes.number,
  height:       React.PropTypes.number,
  className:    React.PropTypes.string,
  lineWidth:    React.PropTypes.number,
  initialColor: React.PropTypes.string,
  endColor:     React.PropTypes.string,
  startMarker:  React.PropTypes.bool,
  finalMarker:  React.PropTypes.bool,
}

Sparkline.defaultProps = {
  dataPoints: [],
  width: null,
  height: null,
  className: null,
  lineWidth: 3,
  initialColor: '#000000',
  endColor: '#000000',
  startMarker: true,
  finalMarker: true,
}

export default Sparkline;

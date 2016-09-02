# react-sparkline-canvas

React component for simple sparklines based on `<canvas>`

## Demo

![demo](http://i.imgur.com/izeIldk.png)

## Getting started

```
npm install react-sparkline-canvas --save
```
```js
import Sparkline from 'react-sparkline-canvas';
```

## Usage

**Basic Example**
```js
<Sparkline
  dataPoints={[1,2,3,3,4,7,5,8,6,2,5,7,6]}
  width={200}
  height={200}
/>
```

**Advanced Example**
```js
<Sparkline
  dataPoints={[1,2,3,4,5,5.5,5.8,6,5.4,4.8,3,2,2,6,7,8,9,10,10,7,6,7,7,8,20]}
  width={700}
  height={450}
  lineWidth={6}
  initialColor={"#007AC9"}
  endColor={"#00c972"}      
/>
```

## Props

| Prop  | Default  | Type | Description |
| :------------ |:---------------:| :---------------:| :-----|
| dataPoints | - | `array` | Values to plot, e.g. `[1,2,3,4,5]` |
| width | `null` | `number` | Required when `width` not defined in CSS className |
| height | `null` | `number` | Required when `height` not defined in CSS className |
| className | `null` | `string` | CSS class name applied to `canvas` wrapper |
| lineWidth | `3` | `number` | Thickness of the sparkline |
| initialColor | `#000000` | `string` | Color for first stop of gradient |
| endColor | `#000000` | `string` | Color for end stop of gradient |
| startMarker | `true` | `bool` | Set to `false` make start dot marker hidden. |
| finalMarker | `true` | `bool` | Set to `false` make final dot marker hidden. |

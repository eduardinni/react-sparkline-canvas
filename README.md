# react-sparkline-canvas

React component to

## Getting started

```
npm install react-sparkline-canvas --save
```
```
import Sparkline from 'rreact-sparkline-canvas';
```

## Usage

```js
<Sparkline
  dataPoints={[1,2,3,3,4,7,5,8,6,2,5,7,6]}
  width={200}
  height={200}
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

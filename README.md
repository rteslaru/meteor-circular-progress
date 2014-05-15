# circular-progress

A reactive, flexible, SVG-based circular progress bar for Meteor

**Table of Contents**
- [Overview](#overview)
- [Getting Started](#getting-started)
 - [Declaring Arguments](#declaring-arguments)
 - [Customizing the Progress Bar](#customizing-the-progress-bar)
 - [Using the Reactive Data Sources](#using-the-reactive-data-sources)
 - [Using Multiple Instances on One Page](#using-multiple-instances-on-one-page)
- [Options](#options)
- [Issues](#issues)
- [Contribute](#contribute)
- [License](#license)

## Overview
_circular-progress_ is an SVG circular progress bar written specifically for Meteor. Besides the progress bar itself, you can also display text in the middle of the circle. It's meant to be usable out of the box; just drop `{{> circularProgress}}` anywhere in your templates and you're good to go!

See it in action at http://circular-progress.meteor.com

## Getting Started

Install _circular-progress_ via meteorite:

```shell
mrt add circular-progress
```

You interact with circular-progress via session variables, so if you don't care much about styling, animations or transitions, here's a quick way to start:

Instruction                                         | Outcome
-----------                                         | -------
`Session.set('progressPercent', 30)`                | Sets the progress bar to 30%
`Session.set('progressText', "we're 30% there")`    | Sets the text inside the circle

Note that  `progressPercent` takes values from 0 - 100. You can, of course, pass `0.5` but that would be interpreted as 0.5%, not 50%. 

### Declaring Arguments

Since `circularProgress` is a regular template, you can pass arguments to it like you normally do. 

You can set the data context directly into your template:

`{{> circularProgress canvasSIze=250 arcWidth=30}}`

You may prefer to pass along an object with the arguments, like so:

```
<template name="mainTemplate">
  {{#with circularOptions}}
    {{> circularProgress}}
  {{/with}}
</template>
```
```javascript
Template.mainTemplate.circularOptions = function() {
    return {
        'canvasSize': 250,
        'arcWidth': 10,
        'sessionValueKey': 'progressValue',
        'tweenDuration': 300
    }
}
```
### Customizing the Progress Bar

#### Layout
The HTML layout of the progress bar is designed to give you maximum flexibility on how you choose to use it. The SVG itself is nested within two `<div>` tags, and you can set a CSS class on each. For example:

`{{> circularProgress outerDivClass="outer-div" innerDivClass="inner-div"}}`

will render

```html
<div class="outer-div">
    <div id="svg-progress-container" class="inner-div">
        <svg>...</svg>
    </div>
</div>
```

That should allow you to do most anything you want layout-wise, including, for example, centering via outer `left: 50%` and inner `left: -50%`.

#### Aspect
circular-progress is made of three visual components: an _outer border_, the _progress bar_ and any _optional text_. You can apply your own CSS class to each of these elements, as follows:

Component       | Applying a custom CSS Class
---------       | ---------
Outer Border    | `borderClass="outer-border"`
Progress Bar    | `progressClass="progress-circle"`
Optional Text   | `textClass="progress-text"`


The _radius_, _width_ and other parameters of the progress bar are set as follows:

Parameter       | Description
---------       | -----------
canvasSize      | Sets the height and width of the SVG element, in pixels
outerPadding    | Adds a padding between the edge of the rectangular SVG element and the border of the progress bar
spacer          | Determines the space between the border and the progress bar, in pixels
arcWidth        | Controls the width of the progress bar
tweenDuration   | Sets the duration of the transition between two points on the progress bar, in milliseconds 

Check out the [Options](#options) section for details and default values of these parameters.

### Using the Reactive Data Sources
You can control the value of the progress bar and the text inside it via `Session` variables. By default, _circular-progress_ looks for `'progressPercent'` and `'progressText'`, but you can customize what `Session` keys it uses with the following options:

Parameter       | Description
---------       | -----------
sessionValueKey | Sets the key used to monitor for progress value changes 
sessionTextKey  | Sets the key used to monitor for text to display

For example, you can set the keys:
```
{{> circularProgress sessionValueKey="my-value-key" sessionTextKey="my-text-key"}}
```
Then, you can control _circular-progress_ via these keys:
```javascript
Session.set('my-value-key', 95);
Session.set('my-text-key', 'Almost there!');
```
### Using Multiple Instances on One Page
You can use more than one progress bar per page, provided you give each a different ID. You probably want to set different session variables too. 

Here's an example how to initialize three circular-progress templates on the same page:
```
{{> circularProgress containerId="svg-container-1" sessionValueKey="value-key-1" sessionTextKey="text-key-1"}}
{{> circularProgress containerId="svg-container-2" sessionValueKey="value-key-2" sessionTextKey="text-key-2"}}
{{> circularProgress containerId="svg-container-3" sessionValueKey="value-key-3" sessionTextKey="text-key-3"}}
```

## Options
Parameter       | Description   | Default Value
---------       | -------   | -----------:
canvasSize      | Sets the height and width of the SVG element, in **pixels** | `300`
outerPadding    | Adds a padding between the edge of the rectangular SVG element and the border of the progress bar, in **pixels** | `20`
textPadding     | Adds a padding to the inner text element. Expressed in number of **characters**  | `0`
spacer          | Determines the space between the border and the progress bar, in **pixels** | `5`
arcWidth        | Controls the width of the progress bar, in **pixels** | `10`
tweenDuration   | Sets the duration of the transition between two points on the progress bar, in **milliseconds** | `750`
sessionValueKey | Sets the session variable **string** used to monitor for progress value changes | `'progressPercent'`
sessionTextKey  | Sets the session variable **string** used to monitor for text to display | `'progressText'`
containerId     | Sets the id of the containing div | `'svg-progress-container'`
outerDivClass   | Applies the **string** as a CSS class to the _outer_ `<div>` container | `null`    
innerDivCLass   | Applies the **string** as a CSS class to the _inner_ `<div>` container | `null`
borderClass     | Applies the **string** as a CSS class to the border outside the progress bar| `'progress-border'`
progressClass   | Applies the **string** as a CSS class to the progress bar| `'progress-circular-bar'`
textClass       | Applies the **string** as a CSS class to the text inside the progress bar| `'progress-text'`
## Issues
_circular-progress_ was tested with Meteor up to 0.8.0.1. If you encounter any issues, please open a ticket at https://github.com/rteslaru/meteor-circular-progress/issues 
## Contribute
Pull requests are more than welcome! 
## License
Released under the MIT license. 
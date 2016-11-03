# Dynamic digram
Dynamic digram is a small library that base on html5 canvas. It soppurt touch interface on mobile devices. It helps you to create flowchart as easy as possible.
#### add a shape
-First, click on a shape on the tool box and make it active.
-Then, click on the chart box to make the pop up visible.
-Finaly, type your custom text inside textbox an click on ad button.

*You can right click on a shape(tap and hold on a shape on touch devices) to make the options menu visible.
## Demos
######[main demo](https://yasharayari.github.io/dynamic-diagram/example/index.html)
######[right to left demo](https://yasharayari.github.io/dynamic-diagram/example/index-rtl.html)

## Installation

Download dynamic-diagram:

- With Bower:

```sh
$ bower install dynamic-diagram
```

- With Git:

```sh
$ git https://github.com/yasharAyari/dynamic-diagram.git
```

- Or manually downloading the [latest release](https://github.com/yasharAyari/dynamic-diagram/archive/master.zip).

------------------------------------------------ 

## Run the Example
1. Make sure that you have installed nodejs & npm & bower & grunt-cli
2. Run these codes on terminal
```sh
$ npm install 
$ bower install
grunt serve
```
3. Open 'http://localhost:9001/example' on your faverite browser 

------------------------------------------------

## Usage

Add these lines to your html file :

```html
<link rel="stylesheet" href="bower_components/bootstrap-sass-rtl/dist/css/ltr/bootstrap.min.css">
<link rel="stylesheet" href="src/css/dynamicDiagram-ltr.css">


<script src="dynamic-diagram.js"></script>
<script type="text/javascript">
  window.onload = function() {
    dynamicDiagram.init(
      {
        id: 'canvas',
        selectedColor: '#9E7AB8',
        shapesClass: '.toolbar__item',
        shapeList: [],
      }
    );
  };
</script>
```

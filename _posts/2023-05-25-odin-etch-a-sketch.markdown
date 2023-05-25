---
layout: post
title:  "The Odin Project: Etch-a-Sketch"
date:   2023-05-25 19:00:16 +0100
categories: ['HTML', 'CSS', 'JS', 'Web']
description: "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills."
repo: "https://github.com/KyleKeeneWelch/odin-etch-a-sketch"
---

## Summary
This project is a project undertaken as part of `The Odin Project` learning web course teaching `HTML`, `CSS` and `JavaScript` skills. It involved putting into practice the teachings of `JavaScript` taught in the previous lessons and required the active use of research and preparation to find the correct JavaScript methods to use.

The use of JavaScript is highly introduced within this project to demonstrate my skills in DOM methods and the manipulation of `HTML` and `CSS` from `JavaScript`. Etch-a-Sketch aims to provide a simple drawing application that enables the user to adjust the canvas size, select a colour, clear and erase drawn areas. Through the use of `event listeners` and `element ID`s, the project is capable of assessing whether the user has clicked onto the canvas and if the user drags their cursor over canvas cells. It would be the functions triggered by the event listeners that enable the interaction with the page such as changing the cell background colour.

The buttons that enable the user to manipulate the canvas in Etch-a-Sketch are contained within a toolbar within several tabs. Tab labels are shown above each tab and consist of colour, mode, tool and layout tabs. Toolbar tabs use the wrap style within the flexwrap property which enable them to snap to multiline when there is not enough space on smaller screen sizes. The canvas size also shrinks and centers itself based upon the width of the device.

## Features

- **Responsive User Interface** - The project provides a responsive user interface that enables the same experience across both mobile and desktop devices. Elements in the toolbar contain the wrap styling to drop to multiple lines if space does not occupy them on the same line. The canvas size is decreased and centered to appear in the correct manner on smaller devices.

- **Adjustable Canvas Sizes** - The canvas itself can have its grid adjusted so that the number of cells that occupy the same space are altered. This means that the user can have more detail in their drawing and can adjust this setting to suit their needs.

- **Range of colours** - The project allows the use of a range of colours to draw on the canvas. This can be manipulated through the colour input on the toolbar which when clicked, will show a box which allows the user to drag the pointer to the colour they like. Upon the change, the new colour is set as the current colour and this is the colour used when drawing on the canvas.

- **Different Modes** - The user is able to select between draw and erase mode. The mode currently selected is shown through the active class which changes the active mode button's background colour. Draw mode which apply the current colour to the cells the user drags the mouse over. Erase mode will return these cells to their original colour, erasing them from the drawing.

- **Scalable design and features** - As a simple drawing application, Etch-a-Sketch has capabilities to improve with more features and its scalable design. There is space on the toolbar and space around the canvas for further tools, features and elements and so offers opportunities for expansion.

- **Toggle Guidelines** - An extra feature included is the use of guidelines which can be toggled with the guidelines button. These will apply a light grey border to all cells in the canvas which make it easier to see the ends of the individual pixels and to draw with more accuracy. Like the mode buttons, when enabled, the button will show a different background colour. The button can be clicked again to turn the guidelines off.

### Draw Mode
<img src="{{site.baseurl}}/assets/images/draw_mode_etch_a_sketch.png" alt="Draw Mode">

Enables the user to draw on the canvas with the currently selected colour.

### Erase Mode

<img src="{{site.baseurl}}/assets/images/erase_mode_etch_a_sketch.png" alt="Erase Mode">

Enables the user to erase drawn pixels on the canvas to their original colour.

### Change Colour

<img src="{{site.baseurl}}/assets/images/change_colour_etch_a_sketch.png" alt="Change Colour">

Selects a new colour to set as the current colour.

### Toggle Guidelines

<img src="{{site.baseurl}}/assets/images/toggle_guidelines_etch_a_sketch.png" alt="Toggle Guidelines">

Shows the guidelines on the canvas in a light grey colour to assist drawing.

### Adjust Canvas Size

<img src="{{site.baseurl}}/assets/images/adjust_canvas_size_etch_a_sketch.png" alt="Adjust Canvas Size">

Adjusts the number of cells that are present in the canvas which provides access to higher level of detail.

### Implementation

#### References to Elements

{% highlight ruby %}
// References to elements in the page.
const gridContainer = document.querySelector('.grid-container');
const cellSlider = document.querySelector('#cell-slider');
const sizeText = document.querySelector('#size-text');
const clearBtn = document.querySelector('#clear-btn');
const chooseColour = document.querySelector('#choose-colour');
const drawBtn = document.querySelector('#draw-btn');
const eraseBtn = document.querySelector('#erase-btn');
const guidelinesBtn = document.querySelector('#guidelines-btn');
{% endhighlight %}

A key area in implementing the JavaScript in the project is to use references to elements in the page. These are variables that store the query results of certain element classes and IDs. `SelectionButtons` is the only instance that uses the `querySelectorAll` function which will return several elements within a `nodelist` to be accessed by the variable. The `querySelector` function will return only one upon success. These variables can be placed at the top of the script and can be accessed within `DOM methods` which will manipulate the text content and styling of the referenced elements when required. This makes it easier to access and less redundant that making references to the same element in several locations.

#### Constant and Let values

{% highlight ruby %}
// Constant values for default state.
const DEFAULT_COLOR = '#333333';
const DEFAULT_SIZE = 16;
const DEFAULT_MODE = 'draw';
const DEFAULT_HAS_GLINES = false;

// Let values for dynamic state.
let currentSize = DEFAULT_SIZE;
let isMouseDown = false;
let currentMode = DEFAULT_MODE;
let currentColour = DEFAULT_COLOR;
let hasGuidelines = DEFAULT_HAS_GLINES;
{% endhighlight %}

Within the implementation, `constants` are used to define default values for several properties of the application such as the colour, canvas size and mode. The use of `constants` allows us to not accidently change static values and to apply these as the starting values of the dynamic `let` variables below. These are changed upon user interaction and do not affect the default values set by the `constants`.

#### Using Event Listeners

{% highlight ruby %}
// Event listeners.
cellSlider.onmousemove = (e) => updateSizeText(e.target.value);
cellSlider.onchange = (e) => changeSize(e.target.value);
clearBtn.onclick = () => reloadGrid();
chooseColour.oninput = (e) => setCurrentColour(e.target.value);
drawBtn.onclick = () => setCurrentMode('draw');
eraseBtn.onclick = () => setCurrentMode('erase');
guidelinesBtn.onclick = () => setGuidelines();
document.body.onmousedown = () => (isMouseDown = true);
document.body.onmouseup = () => (isMouseDown = false);
{% endhighlight %}

In order to provide the interactivity of the JavaScript script `event listeners` were used. These would pick up an assigned event to elements in the page such as the `click` event to the toolbar buttons. Once a click was detected, the script would run the function provided with the assignment of the listener and would place the event as the argument. This would provide reference to the element clicked and could be used to access attributes such as the element's class or ID. In one of the examples provided, we check for whether the slider has been moved by the mouse and once they let go to set the change. From this, the `updateSizeText` function is run with the value of the slider to show the current size and the current size is changed with the `changeSize` function.

#### Maintaining the Grid

{% highlight ruby %}
// Clears the grid.
function clearGrid() {
    gridContainer.innerHTML = '';
    setGuidelines();
}

// Reloads the grid (clears and recreate).
function reloadGrid() {
    clearGrid();
    makeGrid(currentSize);
}

// Creates the grid with the associated size.
function makeGrid(size) {
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (i = 0; i < (size * size); i++) {
        const cell = document.createElement("div");
        cell.addEventListener('mouseover', changeColour);
        cell.addEventListener('mousedown', changeColour);
        gridContainer.appendChild(cell).className = "grid-item";
    };
};
{% endhighlight %}

Another key concept in the implementation of the JavaScript interactivity in the page is the maintaining of the grid. This involves making the grid on load, reloading the grid and clearing it. The grid in this instance refers to the canvas on the page. This is generated using the `gridTemplateColumns` and `gridTemplateRows` properties and applying repeat values of the assigned size to create several equal size cells. Applying the same size to both the column and row property means JavaScript will generate the grid-like display and this is effective to be used as the canvas. Each cell is applied the `mouseover` and `mousedown` event listeners which will change the background colour of the target cell if applicable. These cells are then appended to the `gridContainer` so they form a main parent with several children.

#### ClassList and the Active Class

{% highlight ruby %}
// Sets the active button.
function setActiveButton(mode) {
    if (currentMode === 'draw') {
        drawBtn.classList.remove('active');
    }
    else if (currentMode === 'erase') {
        eraseBtn.classList.remove('active');
    }

    if (mode === 'draw') {
        drawBtn.classList.add('active');
    }
    else if (mode === 'erase') {
        eraseBtn.classList.add('active');
    }
}
{% endhighlight %}

The use of `classList` in the implementation allows the toolbar buttons to display different styling to those that are in an active state compared to inactive. By defining a different background colour to an active class, we can assign this class using `classList.add` and remove this with `classList.remove` to apply the active styling when a certain mode is enabled or the guidelines are set.

#### Changing Colour

{% highlight ruby %}
// Changes the assigned colour or enables eraser.
function changeColour(e) {
    if (e.type === 'mouseover' && !isMouseDown) return
    if (currentMode === 'draw') {
        e.target.style.backgroundColor = currentColour
    }
    else if (currentMode === 'erase') {
        e.target.style.backgroundColor = '#fefefe';
    }
}
{% endhighlight %}

When we want to implement the draw functionality to the canvas, we can use the `changeColour` function to do this. This function will check whether the passed in event is of type mouseover and uses the `isMouseDown` function to check whether the mouse is down. We want to ensure the canvas is drawn upon when the user clicks and drags over a segment. Therefore, we have to check whether the mouse is over and down before changing the colour of a cell to implement this behaviour. When this is the case, we also check what mode we are currently on. If the mode is draw, then we will change the background colour of the targeted cell to the current colour. Otherwise if the mode is erase, we will change the background colour of the targeted cell to the original colour, erasing it from the drawing.
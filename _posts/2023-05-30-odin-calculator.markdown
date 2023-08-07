---
layout: post
title:  "The Odin Project: Calculator"
date:   2023-05-30 19:00:16 +0100
categories: ['HTML', 'CSS', 'JS', 'Web']
description: "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills. Provides functionality typical of a calculator."
repo: "https://github.com/KyleKeeneWelch/odin-calculator"
---

<style>
.center-container {
    display: flex;
    justify-content: center;
    align-items: center;

    & img {
        width: 200px;
        height: 250px;
    }
}
</style>

## Summary
This project is a project undertaken as part of `The Odin Project` learning web course teaching `HTML`, `CSS` and `JavaScript` skills. It involved putting into practice the teachings of `JavaScript` taught in the previous lessons and required the active use of research and preparation to find the correct JavaScript methods to use.

The use of JavaScript is highly introduced within this project to demonstrate my skills in DOM methods and the manipulation of `HTML` and `CSS` from `JavaScript`. The Calculator is a simple application that aims to bring the features of the working arithmetic tool to the web through the integration of `JavaScript` functions. It uses array methods, event listeners, element references, and conditional statements to assess the condition of the application. 

Important details include the processing of only two values with operators such as addition, subtraction, multiplication, division. Negative values can be processed and the display contains an auto overflow value meaning extreme numbers can be entered and can still be seen albeit not easily. 

## Features

- **Performs Core Arithmetic Operations** - Includes core arithmetic operations on two given values including addition, subtraction, multiplication and division. 

- **Display with Overflow Management** - Long input and extreme numbers are accomodated with the overflow value of the display set to auto so that the user can scroll through their input when it exceeds the boundary.

- **Decimals** - Allows the use of decimals as the given values and restricts the user to use only one decimal point for each value.

- **Negative numbers** - Processing of arithmetic calculations can be done with negative numbers with few errors.

- **Clear and Delete Buttons** - Clear and delete buttons allow the user to completely remove all or a single character on the display so that mistakenly entered input can be corrected without causing error in the application.

- **Keyboard Support** - Allows the use of the keyboard to provide input. Number keys enter numbers into the display as do the operators and decimal. Backspace, delete and enter all do their corresponding actions much like the buttons when pressed.

### Display and buttons
<img src="{{site.baseurl}}/assets/images/display_buttons_calculator.png" alt="Display and Buttons">

Contains a simple design with a math related background and title. The calculator itself complements the colour scheme and uses div elements and a grid to create the display and buttons. Buttons are presented as the top buttons and bottom. Top bottoms contain the clear and delete buttons separate from the grid in the bottom which assigns each button its value. 

### Overflow Management

<div class="center-container">
    <img src="{{site.baseurl}}/assets/images/overflow_calculator.png" alt="Display overflow">
</div>

The display has its overflow property set to auto so that a scrollbar appears when the content exceeds the boundary. 

### Decimals

<div class="center-container">
    <img src="{{site.baseurl}}/assets/images/decimal_calculator.png" alt="Decimals">
</div>

Users are able to apply a decimal point to each of the numbers and the numbers are converted and output is provided as a Float when necessary. 

### Negative Numbers

<div class="center-container">
    <img src="{{site.baseurl}}/assets/images/negative_numbers_calculator.png" alt="Negative Numbers">
</div>

Users are able to produce and work with negative values. Minor issues pertain to the deletion of negative operators and the repeat insertion of operator values.

### Implementation

#### References to Elements

{% highlight ruby %}
// References to elements in page.
const bottomButtonsContainer = document.querySelector('#bottom-buttons-container');
const displayText = document.querySelector('#display-text');
const clearbtn = document.querySelector('#clear-btn');
const deletebtn = document.querySelector('#delete-btn');
{% endhighlight %}

A key area in implementing the JavaScript in the project is to use references to elements in the page. These are variables that store the query results of certain element classes and IDs. The `querySelector` function will return only one element upon success. These variables can be placed at the top of the script and can be accessed within `DOM methods` which will manipulate the text content and styling of the referenced elements when required. This makes it easier to access and less redundant that making references to the same element in several locations.

#### Constant and Let values

{% highlight ruby %}
// Constant values for buttons, numbers, operator arrays and default values. 
const BOTTOM_BUTTONS = ['7', '8', '9', '÷', '4', '5', '6', 'x', '1', '2', '3', '-', '.', '0', '=', '+'];
const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const OPERATORS = ['÷', 'x', '+', '-'];
const DEFAULT_NUM_OPERATOR = null;
const DEFAULT_DECIMAL = false;

// Variable values for numbers, operator and decimal booleans.
let firstNum = DEFAULT_NUM_OPERATOR;
let secondNum = DEFAULT_NUM_OPERATOR
let operator = DEFAULT_NUM_OPERATOR;
let firstNumHasDecimal = DEFAULT_DECIMAL;
let secondNumHasDecimal = DEFAULT_DECIMAL;
{% endhighlight %}

Within the implementation, `constants` are used to define default values for several properties of the application such as the colour, canvas size and mode. The use of `constants` allows us to not accidently change static values and to apply these as the starting values of the dynamic `let` variables below. These are changed upon user interaction and do not affect the default values set by the `constants`.

#### Using Event Listeners

{% highlight ruby %}
// Event listeners including clear and delete button functionality and keyboard support through onkeydown.
clearbtn.onclick = (e) => clearDisplayText();
deletebtn.onclick = (e) => deleteDisplayText();
document.body.onkeydown = (e) => {
    // Allow only bottom buttons or slash key (divide sign alternative).
    if (BOTTOM_BUTTONS.includes(e.key) || e.key == '/') {
        if (e.key == '/') {
            processInput('÷');
        }
        else {
            processInput(e.key);
        }
    }
    else if (e.key == "Enter") {
        processInput('=');
    }
    else if (e.key == "Backspace") {
        deleteDisplayText();
    }
    else if (e.key == "Delete") {
        clearDisplayText();
    }
}
{% endhighlight %}

In order to provide the interactivity of the JavaScript script `event listeners` were used. These would pick up an assigned event to elements in the page such as the `click` event to the buttons. Once a click was detected, the script would run the function provided with the assignment of the listener and would place the event as the argument. This would provide reference to the element clicked and could be used to access attributes such as the element's class or ID. In one the examples provided, we pass in the user's input by them clicking on a particular bottom button and the button will pass their text content into the function. Depending on the text content, different parts of the function will be triggered and will make calls to other functions in the application. This includes passing in numbers, operators, decimal point or equals sign. 

#### Making the Grid

{% highlight ruby %}
// Creates grid for bottom buttons.
function makeGrid() {
    for (i = 0; i < 16; i++) {
        const cell = document.createElement("div");
        // Button will display right text based on array order.
        cell.textContent = BOTTOM_BUTTONS[i];
        // Each button will process input by passing in their text.
        cell.onclick = (e) => processInput(cell.textContent);
        // Adds each button to grid.
        bottomButtonsContainer.appendChild(cell).className = "grid-item";
    };
}

// Make grid upon load.
window.onload = () => {
    makeGrid();
}
{% endhighlight %}

Another key concept in the implementation of the JavaScript interactivity in the page is the creation of the grid for the bottom buttons. This involves making the grid on load and assigning each button the appropriate text content via an array. This is generated using the `gridTemplateColumns` and `gridTemplateRows` properties and applying repeat values of the assigned size to create several equal size cells. Applying the same size to both the column and row property means JavaScript will generate the grid-like display and this is effective to be used as the buttons. Each cell is applied the `onclick` event listener which will pass its text content to `processInput()`. These cells are then appended to the `gridContainer` so they form a main parent with several children. The `grid-item` class is applied to each button to provide the appropriate styling during its active and inactive states.

#### First Num Removal Using Substring

{% highlight ruby %}
// Removes first num and obtains second.
function removeFirstNum() {
    let temp = displayText.textContent;
    let index;
    let result;
    // Negative numbers
    if (firstNum < 0) {
        // Remove initial -.
        temp = displayText.textContent.substring(1);
        // Find operator.
        index = temp.indexOf(operator) + 1;
        // Obtain second number.
        result = displayText.textContent.substring(index + 1);
    }
    // Positive numbers
    else {
        //Find operator.
        index = temp.indexOf(operator);
        // Obtain second number.
        result = displayText.textContent.substring(index + 1);
    }
    return result;
}
{% endhighlight %}

To save user input as the two numbers in the calculation, we need to trim the display to obtain the correct values. The second number will require the removal of the first number and the operator inbetween before it can be converted and stored as an Integer or Float. To do this, we use `indexOf` to find where the operator is once the negative sign is removed. As the second number will start immediately after the operator, we can use `substring` to return the rest of the string from this point. The same concept is used during the deletion of the end character in the display by returning the string without the final character.  

#### Check Contains Functions

{% highlight ruby %}
// Checks for decimal.
function checkContainsDecimal() {
    for (i = 0; i < displayText.textContent.length; i++) {
        if (displayText.textContent[i] == '.') {
            return true;
        }
    }
    return false;
}

// Check for operator.
function checkContainsOperator() {
    for (i = 0; i < displayText.textContent.length; i++) {
        if (OPERATORS.includes(displayText.textContent[i])) {
            return true;
        }
    }
    return false;
}
{% endhighlight %}

The check contains functions are a part of the implementation that allows the application to test the user input in the display for whether they have used decimal numbers or whether an operator is present. Much of the issues relating to negative numbers stem from this functionality as the negative symbol is the same as the subtraction symbol and therefore causes the application to reject operator entry. We remove this first as the solution. The check contains functions work by using a for loop to go through each character in the display string and check whether the current character is equal to the character(s) being tested. If a match is found, a boolean true is returned otherwise false is returned.

#### Input Processing

{% highlight ruby %}
// Handle Input.
function processInput(input) {
    //If not equals and not operator
    if (input != '=' && !OPERATORS.includes(input)) {
        // If decimal point.
        if (input == '.')
...
// If equals is pressed.
    else if (input == '=') {
...
// If contains a number.
    if (NUMBERS.includes(input))
...
// If contains an operator.
    else if (OPERATORS.includes(input)) {
{% endhighlight %}

To handle the input provided by the user we use `processInput` in the implementation to determine the course of action. Input can vary from a number, operator, decimal point, equals sign and each of these contains their vary own condition and subconditions to check the current state of the application with its stored values to apply the correct functionality to the calculator. The input is only added to the display if the application deems it applicable after the checks have been made. An example of which would be that the user is only able to enter one operator for the calculation and so will use `checkContainsOperator` to do this within the contains operator branch.
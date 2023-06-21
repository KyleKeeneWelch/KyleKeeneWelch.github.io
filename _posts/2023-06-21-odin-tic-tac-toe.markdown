---
layout: post
title:  "The Odin Project: Tic-Tac-Toe"
date:   2023-06-21 13:00:16 +0100
categories: ['HTML', 'CSS', 'JS', 'Web', 'OOP', 'Factory Functions', 'IIFE']
description: "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills."
repo: "https://github.com/KyleKeeneWelch/odin-tic-tac-toe"
---

## Summary
This project is a project undertaken as part of `The Odin Project` learning web course teaching `HTML`, `CSS` and `JavaScript` skills. It involved putting into practice the teachings of `Factory Functions` and `IIFEs` taught in the previous lessons to create effective data structures and organized code.

The project aims to emulate the popular Tic-Tac-Toe game for two players. It involves display and game elements which will show current game output and process user input to update the state of the game. Through the use of `factory functions` and `IIFE`s we can create application objects upon the script running in the browser which allows us to prepare the page to receive and handle player input.  

Much of the data is handled through an Object-Oriented approach in JavaScript but applies `factory functions` as the take on creating objects instead of the popular use of `constructors`. `Factory functions` enable the developer to return only the properties and functions that they want to be publicly accessed and to essentially hide the rest. Returned public elements still have access to private, hidden elements in the object and this enforces the concept of `closure`. We prevent errors and allow for easier debugging and modification of code by using `Factory functions` this way. 

## Features

- **Two Player** - Provides support for two players to play the game each with there own sign. Rounds alternate meaning it is the other player's go once a field has been selected and a sign placed.

- **Outcome Modal** - After each round played, the application will check the winning combinations to see if the current player has three consecutive signs in each of the field's indexs. The outcome is displayed within a modal shown to the user at the center of the screen alongside a restart button.  

- **Draws** - If no player is able to receive a winning combination after 9 rounds, then the outcome modal is displayed with text declaring the game a draw.

### Starting State

<img src="{{site.baseurl}}/assets/images/starting_state_tic_tac_toe.png" alt="Starting State">

The user interface upon start consists of a header, footer, start message and start button. The user is prompted to press the start button before the game starts and this will allow the application to show game elements.

### Grid Structure
<img src="{{site.baseurl}}/assets/images/grid_structure_tic_tac_toe.png" alt="Grid Structure">

Grid is used to create the game board and to assign the array elements to each field to represent the current state of the game.

### Outcome Modal

<img src="{{site.baseurl}}/assets/images/outcome_modal_tic_tac_toe.png" alt="Outcome Modal">

The outcome modal is a popup that appears at the center of the screen alongside an overlay that places emphasis on the center. Depending on the outcome of the game, the modal will display a different message. Either Player X has won, Player O or a draw. This is followed by a restart button that resets the display and game elements. 

### Draw

<img src="{{site.baseurl}}/assets/images/draw_tic_tac_toe.png" alt="Draw">

The outcome modal with a draw outcome.

### Implementation

#### IIFE

{% highlight ruby %}
// Keep track of grid array and set and get array fields.
const GameGrid = (() => {
    const grid = ['', '', '', '', '', '', '', '', ''];

    const setField = (index, sign) => {
        if (index > grid.length) return;
        grid[index] = sign;
      };
    
      const getField = (index) => {
        if (index > grid.length) return;
        return grid[index];
      };
    
      const restart = () => {
        for (let i = 0; i < grid.length; i++) {
          grid[i] = '';
        }
      }

      return {setField, getField, restart};
})();
{% endhighlight %}

`IIFE`s are known as Immediately Invoked Function Expressions and these, as the name suggests, are functions that run immediately within the script. These allow for developers to specify functionality that they want to make effect immediately upon the page loading. In this case, we want to have our objects created and our event listeners assigned upon the page loading so the user play the game without additional setup. 

#### Factory Functions

{% highlight ruby %}
// Assign X or O to player.
const Player = (sign) => {
    const _sign = sign;

    const getSign = () => {
        return _sign
    }

    return {getSign};
};
{% endhighlight %}

We use `Factory functions` within the implementation of this project as an alternative to `constructors` and to enforce `closure`. With constructors, we pass in values and use the `new` keyword to instantiate an object with the values assigned as properties. Any methods defined within the object are accessible from the new object. Factory functions instead have values assigned and only the properties and methods that we want to be accessed publicly are returned. Public functions can still access private properties and methods as they belong within the same scope. We use this concept of closure to define private and public functions and properties to assist in debugging, reducing errors and better organizing code. In this case, we use a factory function to define a new Player object. This object will return the `getSign()` function therefore making it publicly accessible.

#### Root Variables and Default Styling

{% highlight ruby %}
:root {
    --color-main: #c14953;
    --color-secondary: #2d2d2a;
    --color-background: #4c4c47;
    --black: #000;
    --white: #FFF;
    --valid-color: #9DF148;
    --error-color: #e22121;
    --border-radius: 8px;
    --spacing-xs: 5px;
    --spacing-sm: 10px;
    --spacing-md: 15px;
    --spacing-lg: 20px;
    --spacing-xl: 40px;
    --container-width: 90vw;
    --box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
    position: relative;
    min-height: 100%;
  }
  
body {
    background-color: var(--color-background);
    color: var(--black);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
    word-wrap: break-word;
    display: block;
    color: var(--white);
}
{% endhighlight %}

The implementation makes use of root variables and default styling to improve the development process and the quality of code. Root variables allow us to specify the website's theme and the colours we wish to use in different areas. By specifying the variable name, we can reference the colour and can apply this to element's `color` and `background-color` properties. Default styling is styling applied to all elements to provide a base style that can be inherited by each element. This includes setting the box-sizing, setting the margin and padding to 0 and other things such as the font-family and size.

#### Filter, Some, Every

{% highlight ruby %}
const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

// True if there is a winning combination that the current player's sign has signs in. 
return winCombinations.filter(
    (combination) => combination.includes(index)
).some(
    (possibleCombination) => possibleCombination.every(
        (field) => GameGrid.getField(field) === getCurrentPlayerSign()
    )
)
{% endhighlight %}

We use the `.filter`, `.some`, and `.every` functions from the `Array.Prototype` to determine whether the current player has won. Firstly we define the winning combinations of indexes which represent the location of each of the fields in the game. We then use filter to return only true combinations that meet the following conditions: If a combination has the index of the field the user has selected, then using some to return true if at least one combination meets the following condition: If each index contains the current player's sign for each index in the possible combination. We use `.every()` to make sure every index contains the sign. If a winning combination is found then true is returned and the application will run additional functions to handle end game state.   

#### Event Listeners

{% highlight ruby %}
// Hides start elements and displays main elements.
startBtn.addEventListener("click", (e) => {
    e.target.parentNode.parentNode.style.display = 'none';
    mainContainer.style.display = 'flex';
});

// Each field sets the current player's sign if not already assigned and game not over.
fields.forEach(field => {
    field.addEventListener("click", (e) => {
        if (GameController.getGameOver() || e.target.textContent !== "") return;
        GameController.playRound(parseInt(e.target.dataset.index));
        updateGrid();
    })
});

// Resets grid, display and game elements.
restartBtn.addEventListener("click", (e) => {
    GameController.restart();
    GameGrid.restart();
    DisplayController.setRoundText(1)
    Modal.closeModal();
    updateGrid();
});
{% endhighlight %}

We use event listeners and DOM methods in our user interface implementation to allow us to detect when the user has performed a specific event and to provide an appropriate response. The "click" event on the start and restart buttons allow us to detect whether a user has pressed the buttons and to handle starting or restarting the game through the relevant executed code that follows. The "click" event assigned to each field in the grid will play a round of the game if the field doesn't already have a sign within or the game is not over.
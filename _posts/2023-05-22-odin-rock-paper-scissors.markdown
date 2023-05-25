---
layout: post
title:  "The Odin Project: Rock Paper Scissors"
date:   2023-05-22 19:00:16 +0100
categories: ['HTML', 'CSS', 'JS', 'Web']
description: "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills."
repo: "https://github.com/KyleKeeneWelch/odin-rock-paper-scissors"
---

## Summary
This project is a project undertaken as part of `The Odin Project` learning web course teaching `HTML`, `CSS` and `JavaScript` skills. It involved putting into practice the teachings of `JavaScript` taught in the previous lessons and built upon the previous console application version by implementing a fleshed out user interface and updated logic.

The use of JavaScript is highly introduced within this project to demonstrate my skills in DOM methods and the manipulation of `HTML` and `CSS` from `JavaScript`. By understanding the rules of the typical rock, paper, scissors game, I am able to control conditional logic to assess whether the player's selected choice produces a winning, losing or drawn outcome when compared to a randomly selected choice by the computer. Much of the user interface elements are dynamically shown such as updating the score elements when the player or computer accumulates a point or is shown/hidden from the removal or addition of the class from an element's classlist. 

Hiding elements is manipulated as the added and removed class has styling properties set so an element's display attribute is none. This means we can only show elements on the interface to the user when they are required therefore reducing clutter and increasing user experience. This is used in a "game-like" fashion where the game introduction or menu is shown before the game content is displayed and a button to restart the game is shown upon finish. 

## Features

- **Responsive User Interface** - The project provides a responsive user interface that enables the same experience across both mobile and desktop devices. Elements that are spread across the screen are catered for in the mobile version of the site which drops these to maintain their own spaces. Much of the elements found within the site use flexbox and justify content to center themselves and negotiate their spacing between elements on the same row.

- **Replayable with different outcomes** - The game itself contains a winning, losing and draw state. The player can produce a winning outcome by reaching 5 points. The same applies to the computer where the player would therefore lose. Getting a draw means that nobody receives a point and therefore the outcome involves the continuation of another round until a win or loss is met.

- **Simple and Traditional** - Users can find that the selection between a choice of rock, paper, scissors to be easy from the large buttons representing each choice. The goal of the game is clearly stated in the beginning and the selection of the player and the computer is shown as well as the outcome of a round and eventually the game. The display of such information makes the game simple to play and understand and much of the rules and scoring system are traditional of the rock, paper, scissors game.

- **Image Buttons** - To assist in the selection of a choice, each button contains an image within which when clicked, will provide the same selected choice as the player's hand in the game. This makes it easier to see which option is which and makes for a more refined and aesthetic look.

### Start
<img src="{{site.baseurl}}/assets/images/start_rps.png" alt="Start phase of site">

The display shown upon reaching the site involves the title and challenge of rock, paper, scissors first to 5. The button provided will be handled by the event handler in the click event where the game elements will be shown and the rest hidden. 

### Game

<img src="{{site.baseurl}}/assets/images/game_rps.png" alt="Game phase of site">

The game elements are shown and include the selection container with the choices, the choice container, result container, score container with both scores and the winner container. The user interface will update with each selected choice where a round win will increment the player's score, a round loss will increment the computer's score and a draw will keep the scores. What the player and the computer selected as well as the outcome of the round is displayed. Once somebody reaches 5 points, the winner is displayed and a choice can no longer be chosen. If the play again button is clicked, the game is restarted and enables the player to select a choice.

### Implementation

#### Media Queries and Responsiveness

{% highlight ruby %}
@media only screen and (max-width: 1000px) {
    .container {
        display: block;
    }

    #selection-container {
        display: block;
        margin: auto;

        & div {
            display: block;
            margin: auto;
            margin-top: 20px;
        }
    }
  }
{% endhighlight %}

To apply responsive elements within the site `media queries` where used. These define styles to be applied when the `max-width` of the screen of the device used to view the site reaches below 1000px. The styles applied included switching the `container` class and `selection-container` ID to display `block` instead of `flex`. This means the elements will stretch out and cover the available space instead of form rows/columns in `flexbox`. The `div` elements of the `selection-container` will also occupy a display `block` instead of `flex` so that they can split down into a mobile-friendly column with space in the margin top so they are separated. 

#### References to elements

{% highlight ruby %}
// References to elements in page used in JS
const selectionButtons = document.querySelectorAll('#selection-container div > button');
const startBtn = document.querySelector('#start-btn');
const playAgainBtn = document.querySelector('#play-again-btn');
const scoreContainer = document.querySelector('#score-container');
const choiceContainer = document.querySelector('#choice-container');
...
{% endhighlight %}

A key area in implementing the JavaScript in the project is to use references to elements in the page. These are variables that store the query results of certain element classes and IDs. `SelectionButtons` is the only instance that uses the `querySelectorAll` function which will return several elements within a `nodelist` to be accessed by the variable. The `querySelector` function will return only one upon success. These variables can be placed at the top of the script and can be accessed within `DOM methods` which will manipulate the text content and styling of the referenced elements when required. This makes it easier to access and less redundant that making references to the same element in several locations.

#### Using Event Listeners

{% highlight ruby %}
selectionButtons.forEach((button) => {
    // If the button is clicked or the image in the button.
    button.addEventListener('click', (e) => {
        if (e.target.id == 'select-rock' || e.target.parentNode.id == 'select-rock') {
            playRound(0, getComputerChoice());
        }
        else if (e.target.id == 'select-paper' || e.target.parentNode.id == 'select-paper') {
            playRound(1, getComputerChoice());
        }
        else if (e.target.id == 'select-scissors' || e.target.parentNode.id == 'select-scissors') {
            playRound(2, getComputerChoice());
        }
    });
})
...
{% endhighlight %}

In order to provide the interactivity of the JavaScript script `event listeners` were used. These would pick up an assigned event to elements in the page such as the `click` event to the selection buttons. Once a click was detected, the script would run the anonymous function provided with the assignment of the listener and would place the event as the argument. This would provide reference to the element clicked and could be used to access attributes such as the element's class or ID. In the example provided, we check for whether the returned element's ID or the parent's ID is a choice in the game (the button or the image in the button) and passes the choice as an argument to the playRound function.

#### Text Content and ClassList

{% highlight ruby %}
// If there is a winner, display winner text and show play again button. Disable selection buttons as game is over.
if (playerScore.textContent == "5" || computerScore.textContent == "5") {
    if (playerScore.textContent == "5") {
        winText = document.createElement('p');
        winText.textContent = "Player Wins!"
        winnerContainer.prepend(winText);
    }
    else {
        winText = document.createElement('p');
        winText.textContent = "Computer Wins!"
        winnerContainer.prepend(winText);
    }

    playAgainBtn.classList.remove('hidden');

    selectionButtons.forEach((button) => {
        button.disabled = true;
    });
} 
{% endhighlight %}

Another key concept in the implementation of the JavaScript interactivity in the page is the use of the `text content` and `classList` attributes. These are attributes of the referenced elements that are accessed in order to manipulate the text displayed to the user and the styling applied. The class `hidden` is used to hide an element through display none or show the element through the removal of the class. This is effective in JavaScript where we can add or remove the class to referenced elements when they should no longer be seen or should be seen by the player. Changing the `text content` in useful in updating the score in the game and to provide dynamic output to the user such as what was played and the winner of the round.  

#### Random Numbers

{% highlight ruby %}
function getComputerChoice() {
    // Return random number between 0 and 2.
    return Math.floor(Math.random() * 3);
}
{% endhighlight %}

A final concept used in the JavaScript of the site is the use of random numbers to generate the computer's choice to rock, paper, scissors. The function `getComputerChoice()` will return a value that is between 0 and 2 inclusive. This is formed from the `Math.random` function and the `Math.floor` function which will generate a value, multiply by 3 and round this to an integer to form a value withint the correct range. This can be used to consistently provide a random selection by the computer where the produced values represent the choices rock, paper or scissors. 
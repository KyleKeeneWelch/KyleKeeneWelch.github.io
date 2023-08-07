---
layout: post
title:  "The Odin Project: Library"
date:   2023-06-17 13:00:16 +0100
categories: ['HTML', 'CSS', 'JS', 'Web', 'CSS Grid', 'OOP']
description: "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills. Utilizes DOM methods and objects to create book entries and maintain a library application."
repo: "https://github.com/KyleKeeneWelch/odin-library"
---

## Summary
This project is a project undertaken as part of `The Odin Project` learning web course teaching `HTML`, `CSS` and `JavaScript` skills. It involved putting into practice the teachings of `Objects` and `Constructors` taught in the previous lessons to create effective data structures to manipulate within a library-based application. 

The project aims to display a catalogue of books that the user enters into the form modal and shows the book's details and whether it has been read. A book's title, author, number of pages are the details shown. If the "have you read" checkbox is checked, the book container displays a green background color while red is displayed otherwise. The checkbox on the container will flip the read status so the user is able to update the application once they have read the book. A "remove" button is also provided so that the user can delete a book entry from the library catalogue.

Much of the data is handled through an Object-Oriented approach in JavaScript where a book and a library represents individual data structures with their own properties and methods. The user interface is reflected upon the values stored in the created book and library objects. The library will maintain an array of books of which will store many book objects and the grid container in the user interface will update to match the books found within.

## Features

- **Flexbox and Grid** - Uses flexbox and grid tools to position and structure page elements according to the design.

- **JavaScript Validation API** - Uses JavaScript Validation API to handle the validation of the add book form manually. It performs checks upon the placed validation rules on the fields in the form and the form will accept or reject values based on the validity of the fields. The preventDefault() function prevents the form from sending the data and allows us to alter the contents in the page without a refresh.

- **Error Messages and Borders** - A flagged check will provide the appropriate error message below the triggering field so that the user is able to enact on the error. An invalid or crossed validation rule will change the border of a field to red while valid changes to green.

- **Keyboard Support** - Allows the user to use the "escape" and "enter" keys to close the form modal and submit the entry.

### Starting State

<img src="{{site.baseurl}}/assets/images/starting_state_library.png" alt="Starting State">

The user interface upon start consists of a header, footer, add book button and a no books message. Clicking on the add book button will open the add book modal. Entering a valid book entry will create a book container and place it within the book grid. Removing all books will cause the no books message to return.

### Grid Structure
<img src="{{site.baseurl}}/assets/images/grid_structure_library.png" alt="Grid Structure">

Grid is used to provide a consistent size row for each book and to appropriately distance elements within each book container.

### Form, Validation and Error Messages

<div class="center-container">
    <img src="{{site.baseurl}}/assets/images/form_library.png" alt="Form, Validation and Error Messages">
</div>

The add book modal will display the form with fields to create a new book. Fields included are `Title`, `Author`, `Pages` and a "have you read" checkbox. Input that is deemed invalid by the validation API will provide the appropriate error message below the conflicting field(s). The border of each field will change colour depending on whether the input is considered valid or invalid. Only a valid form status will create a new book and add it to the book grid. 

### Flipping Read Status

<div class="center-container">
    <img src="{{site.baseurl}}/assets/images/flip_read_library.png" alt="Flipping Read Status">
</div>

Books that are displayed in the book grid will reflect whether they have been read by their green or red background colour. This is set initially by the "have read" checkbox and can be flipped through the checkbox found on the book container.

### Implementation

#### Using Grid

{% highlight ruby %}
const resetBookGrid = () => {
    bookGrid.innerHTML = ''
}

const updateGrid = () => {
    resetBookGrid()
    if (library.books.length === 0) {
        noBooksText = document.createElement('h3')
        noBooksText.textContent = 'No Books Avaliable! Click the "Add Book" button to add a book!'
        bookGrid.appendChild(noBooksText)
    } else {
        for (let book of library.books) {
            createBookCell(book)
        }
    }
}
{% endhighlight %}

A key area in the implementation is the use of grid to structure and place elements in the webpage. We use the `grid-template-rows` and `grid-template-columns` to define the rows and columns of the grid as well as the sizes of the tracks. In our application, we apply the `updateGrid()` and `resetBookGrid()` methods to constantly reset and recreate the grid with the new books added to the library. When we create a new book cell, we create the necessary elements in JavaScript, apply the correct classes,s attributes and append the elements to one another as well as the grid itself. We also perform a check to see if there is no books available in the library in which case the grid is provided with a "no books available" message. 

#### Form Validation API

{% highlight ruby %}
...
bookForm.addEventListener("submit", (e) => {
    if(title.validity.valueMissing) {
        titleError.textContent = "Title is required";
        titleError.classList.add('active')
        title.style.border = '2px solid var(--error-color)'
    }

    if(author.validity.valueMissing) {
        authorError.textContent = "Author is required";
        authorError.classList.add('active')
        author.style.border = '2px solid var(--error-color)'
    }

    if(pages.validity.valueMissing) {
        pagesError.textContent = "Pages is required";
        pagesError.classList.add('active')
        pages.style.border = '2px solid var(--error-color)'
    }

    if (bookForm.checkValidity()) {
        e.preventDefault()
        addBook()
    }
    else {
        e.preventDefault();
    }
})
{% endhighlight %}

The Form `Validation API` will allow us to specify which validation rules to check and the appropriate error messages to display once the chreck is flagged. We show the correct message, the message itself and change the border to red when a field fails a validation check. If the checks are clear on a field, the border is set to green and the associated error message is removed. The form uses `preventDefault()` to stop it from sending the data and refreshing the page. We use the form input within several other functions chaining from the `addBook()` function called upon valid entry. 

#### Root Variables and Default Styling

{% highlight ruby %}
:root {
    --color-main: #233d4d;
    --color-secondary: #fe7f2d;
    --color-background: #E2ECE9;
    --black: #000;
    --white: #FFF;
    --valid-color: #9DF148;
    --error-color: #e22121;
    --not-read-color: #F05555;
    --read-color: #a1c181;
    --border-radius: 8px;
    --spacing-xs: 5px;
    --spacing-sm: 10px;
    --spacing-md: 15px;
    --spacing-lg: 20px;
    --spacing-xl: 40px;
    --container-width: 1200px;
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
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    font-size: 16px;
    word-wrap: break-word;
    margin-bottom: 100px;
    display: block;
}
{% endhighlight %}

The implementation makes use of root variables and default styling to improve the development process and the quality of code. Root variables allow us to specify the website's theme and the colours we wish to use in different areas. By specifying the variable name, we can reference the colour and can apply this to element's `color` and `background-color` properties. Default styling is styling applied to all elements to provide a base style that can be inherited by each element. This includes setting the box-sizing, setting the margin and padding to 0 and other things such as the font-family and size.

#### Data Structures

{% highlight ruby %}
function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;

    this.info = function() {
        let readText = haveRead ? "have read." : "not read yet";
        return this.title + ", by " + this.author + ", " + this.pages + " pages, " + readText;
    }
}

function Library() {
    this.books = []

    this.createBookFromInput = function() {
        const title = document.getElementById('title').value.replace(/^\s+|\s+$/gm,'')
        const author = document.getElementById('author').value.replace(/^\s+|\s+$/gm,'')
        const pages = document.getElementById('pages').value
        const haveRead = document.getElementById('have-read').checked
        return new Book(title, author, pages, haveRead)
    }

    this.isInLibrary = function(newBook) {
        return this.books.some((book) => book.title === newBook.title)
      }

    this.addToLibrary = function(newBook) {
        if (!this.isInLibrary(newBook))
        {
            this.books.push(newBook)
        }
        else {
            console.log('Book already in library')
        }
    }

    this.removeBook = function(title) {
        this.books = this.books.filter((book) => book.title !== title)
      }
}

library = new Library()
{% endhighlight %}

Data structures such as the Book and Library objects allow us to take an Object Oriented approach when it comes to handling application data. We create a library object upon startup so that we can reference this and store our created Book objects. Both the Book and Library objects contain properties and methods that belong only to those objects. The script accesses these through dot notation and manipulates the data and objects stored through the functionality provided in the methods. 

#### Event Listeners and DOM Methods

{% highlight ruby %}
haveRead.addEventListener("change", (e) => {
        if (e.target.checked) {
            bookContainer.classList.add('active')
        }
        else {
            bookContainer.classList.remove('active')
        }
    })

removeBook.addEventListener("click", (e) => {
    const title = e.target.parentNode.parentNode.parentNode.firstChild.firstChild.innerHTML
    library.removeBook(title)
    updateGrid()
})
{% endhighlight %}

We use event listeners and DOM methods in our user interface implementation to allow us to detect when the user has performed a specific event and to provide an appropriate response. The "change" event on the haveRead checkbox is an example of this where we will alter the active class on the book container so that it displays a green or red background depending on the read status. The `removeBook` click event is another example that will obtain the book container's book title and will remove this from the library before updating the grid.
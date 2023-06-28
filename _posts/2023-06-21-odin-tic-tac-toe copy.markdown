---
layout: post
title:  "The Odin Project: Restaurant Page"
date:   2023-06-28 13:00:16 +0100
categories: ['HTML', 'CSS', 'JS', 'Web', 'Webpack', 'NPM', 'HTML Webpack Plugin']
description: "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills."
repo: "https://github.com/KyleKeeneWelch/odin-restaurant-page"
---

## Summary
This project is a project undertaken as part of `The Odin Project` learning web course teaching `HTML`, `CSS` and `JavaScript` skills. It involved putting into practice the teachings of `Webpack`, `Node Package Manager`, and the `DOM` to create an efficient, JavaScript-based restaurant page.

The project aims to put into practice the bundling and benefits of Webpack and get comfortable with packages and config files. A challenge that this project also provides is the need to generate HTML files dynamically through the use of programatically defined elements in JavaScript DOM. A plugin known as the `HTML Webpack Plugin` is used with multiple instances to automatically generate HTML files with the relevant chunks to assign scripts. Scripts contain imports with the dependancies required for the page they create and are bundled by webpack and placed in a distribution folder. 

The project itself contains three pages, a home, menu and contact page. Content is typical of a Japanese restaurant food provider and do not reflect the actual functions of real-world fast-food chains. We use this template to demonstrate skills developed in the related areas and we are able to generate interactive, responsive pages all through JavaScript.

## Features

- **JavaScript-Based** - Page structure and interactivity is handled through JavaScript and the use of HTML Webpack Plugin to generate HTML files. Scripts are injected into generated pages through the specified entry points and chunks of each page. Scripts contain DOM statements and methods to create and append elements to the body of the document. 

- **Webpack Bundling and Optimization** - Webpack scans the imports made from files in the src folder and bundles these for optimization purposes. Files include .ttf truetype, .css cascading stylesheets, and .jpg images. We use packages such as `css loader` and `style loader` to access css content and inject this into the style tags of generated HTML documents. 

- **Responsive using Grid and Media Queries** - Pages are responsive with support for both desktop and mobile using the tools of Grid and Media Queries. A key functionality used is the use of `repeat()`, `autofill` and `minmax` with Grid to create a complex, responsive grid layout in the menu. Media Queries specify breakpoints of which we alter elements to accomodate the new viewport size.  

- **Novalidate and JavaScript Validation API** - The contact form although simple, uses the JavaScript Validation API to assess validation rules and the validity of the form through the script instead of the HTML page. We use `novalidate` to specify that we will handle validation ourselves and we assign error messages on each field to reflect the breaches to validation rules upon entry.

### Home Page

<img src="{{site.baseurl}}/assets/images/home_page_restaurant_page.png" alt="Home Page">

The Home page contains a restaurant background image, header and an area to draw user attension to order at the restaurant. It uses a simple design for its navigation and footer and is used amongst the rest of the pages for consistency of design. 

### Menu Page
<img src="{{site.baseurl}}/assets/images/menu_page_restaurant_page.png" alt="Menu Page">

The Menu page contains a header, navigation and footer much like the home page. It also contains a menu list container on the side and menu item cards within the main portion of the page. Clicking on a menu category of menu item will change the item cards listed within the display container. Item cards will change size and will drop columns depending on the size of the viewport. They contain a menu item image, name, price and buttons to add to order and view dietry information (Out of scope).

### Contact Page

<img src="{{site.baseurl}}/assets/images/contact_page_restaurant_page.png" alt="Contact Page">

The contact page contains a simple form for entering information and provides validation for proper user input. The submittion however is not properly handled and instead uses the `mailto` function as a dummy action as accessing input is not the aim of this project. A random number and an email is provided as an alternative to contact the restaurant.

### Implementation

#### Webpack Config

{% highlight ruby %}
entry: {
    'index': './src/scripts/index.js',
    'menu': './src/scripts/menu.js',
    'contact': './src/scripts/contact.js'
  },
  devtool: 'inline-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      title: 'Odin - Restaurant Page Home',
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      inject: true,
      title: 'Odin - Restaurant Page Menu',
      filename: 'menu.html',
      chunks: ['menu']
    }),
    new HtmlWebpackPlugin({
      inject: true,
      title: 'Odin - Restaurant Page Contact',
      filename: 'contact.html',
      chunks: ['contact']
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
{% endhighlight %}

The `webpack.config.js` file is the file that configures webpack for use within our pages. We define the entry points to specify the files we want to read, bundle and optimize for our output. We define a new `HTMLWebpackPlugin` for each HTML page we want to dynamically generate and specify the title, filename and chunks of which we should inject into each. The chunks specify which of the entry points we want the output to be injected in each file and therefore, each file has its own allocated, optimized script where we can therefore define DOM methods and interactivity for the page. The output generated a `____.bundle.js` file with its name dynamically assigned depending on the entry point being processed. We place the output within the distribution folder as opposed to our source files in the src folder. `clean` set to true will clear the distribution folder before we place new processed documents.   

#### Package.json

{% highlight ruby %}
{
  "name": "odin-restaurant-page",
  "version": "1.0.0",
  "description": "How to interact and run the restaurant page.",
  "private": true,
  "main": "./scripts/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "watch": "webpack --watch",
    "start": "webpack serve --open",
    "server": "node server.js",
    "build": "webpack"
  },
  "keywords": [],
  "author": "Kyle Keene-Welch",
  "license": "ISC",
  "devDependencies": {
    "@fortawesome/fontawesome-free": "^6.4.0",
    "html-webpack-plugin": "^5.5.3",
    "webpack": "^5.88.0",
    "webpack-cli": "^5.1.4"
  },
  "dependencies": {
    "css-loader": "^6.8.1",
    "style-loader": "^3.3.3"
  }
}
{% endhighlight %}

The `package.json` file is typical of the use of the `Node Packagae Manager`. It specifies the dependancies that belong to our web application and these are categorized within dev-dependancies and dependancies for the development and production stages. This file makes it easier to share and access software as it defines a centralized list of dependancies for the viewer/editor to install before they can access the application as the developer intended. We also provide a list of `scripts` which provide helpful commands and executables from the use of that command that help during the development process. `start` for example, will open a new `express` server on the configured port so that changes made during code are reflected instantly on the browser through the server.

#### Root Variables and Default Styling

{% highlight ruby %}
:root {
    --color-main: #DC1C1C;
    --color-secondary: #dc5c1c;
    --color-background: #000103;
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
    --box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

@font-face {
    font-family: 'RockBilly';
    src: url('../assets/Rockybilly.ttf') format('truetype');
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
    color: var(--white);
    font-family: Arial, Helvetica, sans-serif;
    font-size: 16px;
    word-wrap: break-word;
    display: block;
    min-height: 100vh;
}
{% endhighlight %}

The implementation makes use of root variables and default styling to improve the development process and the quality of code. Root variables allow us to specify the website's theme and the colours we wish to use in different areas. By specifying the variable name, we can reference the colour and can apply this to element's `color` and `background-color` properties. Default styling is styling applied to all elements to provide a base style that can be inherited by each element. This includes setting the box-sizing, setting the margin and padding to 0 and other things such as the font-family and size.

#### JavaScript Modules

{% highlight ruby %}
export function createFooter() {
    const footer = document.createElement('footer');
    const footerText = document.createElement('p');
    const footerLink = document.createElement('a');
    const footerIcon = document.createElement('i');

    footerText.textContent = 'Kyle Keene-Welch © 2023';
    footerLink.href = "https://github.com/KyleKeeneWelch";
    footerIcon.classList.add('fa-brands');
    footerIcon.classList.add('fa-github');
    footerIcon.ariaHidden = 'true';

    footerLink.appendChild(footerIcon);
    footer.appendChild(footerText);
    footer.appendChild(footerLink);

    return footer;
}

...

import { createMain, createFooter, createHeader, createNavigation, createContent } from './main.js';
{% endhighlight %}

Within the implementation, we use JavaScript modules to export functions that help avoid redundant functionality between scripts. This includes things such as recreating the code for generating a header or footer in each file. We can instead define this once within a "main" script that can then be used as an import amongst several other scripts that make use of the functionality in the module. 

#### Arrays and .split, .join

{% highlight ruby %}
import MixedPlatter from '../assets/mixed-platter.jpg';
import CrispyAromaticDuck from '../assets/crispy-aromatic-duck.jpg';
import MisoSoup from '../assets/miso-soup.jpg';
import SpareRibs from '../assets/spare-ribs-in-syrup.jpg';
import JapaneseTofu from '../assets/japanese-tofu.jpg';
...

const menu = [
    [
        'Mixed Platter - £11.50',
        'Crispy Aromatic Duck - £11.80',
        'Miso Soup - £4.00',
        'Spare Ribs in Syrup - £6.20',
        'Japanese Tofu - £5.20',
    ],
    [
        'Chicken Curry - £9.00',
        'Beef in Black Bean Sauce - £8.50',
        'Satay Pork - £8.50',
        'Sweet & Sour Chicken - £8.50',
        'Sweet & Sour Chicken Balls - £8.00'
    ],
...

const displayImages = [
    [
        MixedPlatter,
        CrispyAromaticDuck,
        MisoSoup,
        SpareRibs,
        JapaneseTofu,
    ],
    [
        ChickenCurry,
        BeefBlackBean,
        SatayPork,
        SweetSourChkn,
        SweetSourChknBalls
    ],
...

menu.forEach((category) => {
    const categoryText = getCategory(category);
    const itemCategory = document.createElement('p');
    itemCategory.textContent = categoryText;
    itemCategory.classList.add('item-category');

    itemCategory.addEventListener('click', () => {
        clearDisplayGrid();
        displayItems(categoryText.split(' ').join(''));
    });

    menuItemsContainer.appendChild(itemCategory);

    category.forEach((menuItem) => {
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('item-container');
        itemContainer.classList.add(categoryText.split(' ').join(''));
...
{% endhighlight %}

The approach to the menu takes upon the form of `Imports`, `Arrays` and `String.prototype` methods. We aim to reflect the current display of item cards based upon a user clicking on an item belonging to a category or the category itself. To do this, we define a menu array with arrays as its elements. Each sub array corresponds to a different menu category while the elements of such arrays represent items and prices separated with a "-". We also replicate this structure within an array with menu images so array items link to their image. To access a menu item, we use `forEach()` on both the menu and each category itself to generate item cards with only the items in the selected category. To provide the text content of elements we use `.split()` to split and obtain only the name or price and `.join` in instances where we need to assign a class without the error of a space for example. We reset the inner HTML of the display container and append item cards each time the user triggers the click event listener on a menu item or category. 
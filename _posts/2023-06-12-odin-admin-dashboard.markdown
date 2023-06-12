---
layout: post
title:  "The Odin Project: Admin Dashboard"
date:   2023-06-12 19:00:16 +0100
categories: ['HTML', 'CSS', 'JS', 'Web', 'CSS Grid']
description: "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills."
repo: "https://github.com/KyleKeeneWelch/odin-admin-dashboard"
---

<style>
.center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}

@media only screen and (max-width: 650px) {
    .center-container img {
        width: 164px;
        height: 214px;
    }
</style>

## Summary
This project is a project undertaken as part of `The Odin Project` learning web course teaching `HTML`, `CSS` and `JavaScript` skills. It involved putting into practice the teachings of `CSS Grid` taught in the previous lessons to put together an effective grid structure in the webpage and to place page elements to suit a design.

The project hands a webpage mockup of which is the aim outcome structure and appeal. It is up to the developer to use the taught skills of `flexbox`, `grid` and `relative units` to appropriately structure and place elements much like the design. Grid is a powerful tool that enables developers to incorporate complex structures that would either be difficult or impossible to replicate in flexbox. The practice of this tool is a great way to introduce it into future projects where the benefits of using grid will heighten the development process and produce effective webpages.

Also included is the use of media queries to alter page structure and elements so that they reflect upon the device viewing the page. Devices with bigger and smaller viewports are accomodated through the alteration of the sidebar and page content so borders of content do not overflow the edges of the device and content can be read and understood clearly.

## Features

- **Flexbox and Grid** - Uses flexbox and grid tools to position and structure page elements according to the design.

- **SVG Icons** - Uses SVG graphics to represent icons within buttons on the page. These use mathematical values to recreate shapes and structure to represent known icons with meaning.

- **Media Queries and Responsiveness** - Uses media queries to assess the current size of the viewport and applies styles when certain breakpoints are met. Breakpoints include a medium iPad-like size and a small mobile-like size. Styles change elements to fit the device.

### Grid Structure
<img src="{{site.baseurl}}/assets/images/grid_structure_admin_dashboard.png" alt="Grid Structure">

Grid is used to create rows and columns to place our content within. Here we define a main container as grid with rows and columns to accomodate the sidebar, navigation, main tab and page content. Grid is also used nested within the grid items in the container where the page content defines its own rows and columns to separate the content. 

### SVG Icons

<div class="center-container">
    <img src="{{site.baseurl}}/assets/images/svg_icons_admin_dashboard.png" alt="SVG Icons" width="185px" height="272px">
</div>

SVGs are used within the buttons of the webpage as icons to convey meaning. Much of the instances where SVGs are used are within the sidebar. The icon is made with mathematical values and is placed alongside the text meaning. Both of these are affected upon button hover and the icon is displayed by itself in the mobile representation of the webpage.

### Medium Breakpoint

<div class="center-container">
    <img src="{{site.baseurl}}/assets/images/medium_breakpoint_admin_dashboard.png" alt="Medium Breakpoint" width="372px" height="389px">
</div>

The medium breakpoint is a value given to the media query that applies styles to when the viewport size meets a "medium" size. This size is typical of popular devices such as iPads. The styles applied include setting the sidebar's display to none and showing the mobile-sidebar below the header. The other major change is the grid columns and rows defined in the page content where the announcements and trending sections are dropped below the projects.

### Small Breakpoint

<div class="center-container">
    <img src="{{site.baseurl}}/assets/images/small_breakpoint_admin_dashboard.png" alt="Small Breakpoint" width="269px" height="441px">
</div>

The small breakpoint is a value given to the media query that applies styles to when the viewport size meets a "small" size. This size is typical of popular devices such as iPads. The styles applied included much of the styles from the medium breakpoint and changes to the header which applies the display of children to block and centers using flexbox.

### Implementation

#### Using Grid

{% highlight ruby %}
.page-content {
    background-color: var(--color-tertiary);
    grid-column: 2 / 3;
    grid-row: 2 / 6;
    display: grid;
    grid-template-rows: 15px 3fr 25px 3fr;
    grid-template-columns: 5fr 2fr;
    padding: 20px;
    row-gap: 10px;
    column-gap: 20px;
    height: 99%;

    & h2 {
        font-size: 20px;
        font-weight: 600;
    }
}

.page-content h2:first-of-type {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    display: grid;
    align-self: center;
}

.page-content h2:nth-of-type(2) {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    display: grid;
    align-self: center;
}

.page-content h2:nth-of-type(3) {
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    display: grid;
    align-self: center;
}
{% endhighlight %}

A key area in the implementation is the use of grid to structure and place elements in the webpage. We use the `grid-template-rows` and `grid-template-columns` to define the rows and columns of the grid as well as the sizes of the tracks. We also use `relative units` to distrubute the available space between the rows and columns. `Gap` is also an attribute that allows us to separate and apply space between the tracks in the rows and columns. We use `grid-column` and `grid-row` on grid items to specify which column and row lines the element should span across. 

#### Media Queries

{% highlight ruby %}
@media only screen and (max-width: 850px) {
    .sidebar {
        display: none;
    }

    .mobile-sidebar {
        display: flex;
    }

    .header {
        grid-column: 1 / -1;
        height: fit-content;
    }

    .container {
        height: 100%;
        grid-template-rows: none;
    }
...

@media only screen and (max-width: 550px) {
.main-tab {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;

    & button {
        width: 50%;
        padding: 5px;
        margin-top: 5px;
    }
}
}
{% endhighlight %}

In order to make the webpage responsive and suitable for all devices, we use media queries within the implementation to define breakpoints. The medium and small breakpoints apply styles catering to the needs to make the content display and readable on devices of that size. Some of the styling applied makes changes to the `display` property, `columns` and `rows` an element span, the `height` of elements and the positioning. 

#### Root Variables and Default Styling

{% highlight ruby %}
:root {
    --color-main: #fe5f55;
    --color-secondary: #777da7;
    --color-white: #fefefe;
    --color-tertiary: #DAF3CA;
    --color-grey: #D5DAD3;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
    font-family:system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
{% endhighlight %}

The implementation makes use of root variables and default styling to improve the development process and the quality of code. Root variables allow us to specify the website's theme and the colours we wish to use in different areas. By specifying the variable name, we can reference the colour and can apply this to element's `color` and `background-color` properties. Default styling is styling applied to all elements to provide a base style that can be inherited by each element. This includes setting the box-sizing, setting the margin and padding to 0 and other things such as the font-family and size.
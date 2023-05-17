---
layout: post
title:  "The Odin Project: Landing Page"
date:   2023-05-17 19:00:16 +0100
categories: ['HTML', 'CSS', 'JS', 'PHP', 'XAMPP', 'Web']
description: "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills."
repo: "https://github.com/KyleKeeneWelch/odin-landing-page"
---

<style>
    .center-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    @media only screen and (max-width: 650px) {
    .center-container img {
        width: 164px;
        height: 214px;
    }
}
}
</style>

## Summary
This project is a project undertaken as part of `The Odin Project` learning web course teaching `HTML`, `CSS` and `JavaScript` skills. It involved putting into practice the teachings of `HTML` and `CSS` covered in the previous lessons while also incorporating my own ideas and outside knowledge. **The Business and Products shown are intended for learning and demonstration purposes of web skills and do not provide marketing or rights of the content shown**.

This project enabled me to create a landing (`product`) page of a new product for a business. Other pages included the `sign up` and `contact` pages which allowed users to sign up to the newsletter and contact the team. Each page provided a consistent navigation bar and footer. The navigation bar was responsive and switched to provide a burger menu on mobile and small screens.

The product page provided a simple flexbox layout and responsive design with product images, blockquote and links to the sign up page. The `sign up` page advertised for upcoming products by the business and placed ideas of mock-up products to entice the user to sign up. To sign up, a form is provided with fields including the user's name, email, contact number and checkboxes for preferred contact methods. Much like the `sign up` page, the `contact` page provides a contact form to get in touch with the business and image links allow users to redirect to the business's social media profiles. 

In the backend, `PHP` is used with `XAMPP` to provide a local server to be used to process the form values. The sign up script will validate and clean sign up form values and if valid, will write these to a text file named newsletter.text. The contact script will validate and clean contact form values and will send an automatic email with the mail function to a set address.

## Features

- **Responsive Design** - Utilizing media queries, flexbox and relative values, the project is able to control the display of included content to fit all viewport sizes and devices. The site has a desktop design which will express containers, images and text in a manner that makes use of space appropriately and draws in users. It also has intermediate and mobile designs which will display content to keep it within boundaries and allowing it to be consumed in its new dimensions.

- **Consistent use of Colour, Font and Styles** - Each page within the project contains the same theme and styles that carry over from the last page. The user is easily able to tell which containers provide content, which include form fields, which elements were links, buttons and more. The font is displayed big and bold for headings and important information and the colour scheme provides an attractive look for the site and encourages reading of the business's product. 

- **Newsletter** - An additional feature not part of The Odin Project was the inclusion of a basic newsletter. The newsletter will be in the form of a text file which contains user's who have signed up, their contact information and their preferred contact method(s). These could be used by the business to alert signed up users to new products and services. The newsletter text file is appended to through the backend processing of the sign up form through PHP.

- **Automatic Email** - Another great feature is the use of the mail function to automatically email a correspondant at the business. This provides back-end processing to the contact form which will clean and validate the input and automatically fill in the email components. Once the message has been constructed dynamically from the fields, this is placed and sent to the correct address. 

### Product Page
<img src="{{site.baseurl}}/assets/images/product_landing_page.png" alt="Product Page">

This page provides the main product that the landing page promotes. It provides a large product image and header and displays its benefits in a delightful manner. The page also contains a testimony which displays the user with a good review. Links to the `sign up` page are also provided in a container with a button.

### Sign Up Page

<img src="{{site.baseurl}}/assets/images/sign_up_landing_page.png" alt="Sign Up Page">

Within this page, there are several upcoming products that are contained within their own sections which provides the name, description of the product and a link to the following sign up form to sign up to hear more. The sign up form provides fields such as the name, email, contact number, and preferred contact method(s) and a submit button. Providing valid input will add the user to the newsletter. Duplicate names become invalid.

### Contact Page 

<img src="{{site.baseurl}}/assets/images/contact_landing_page.png" alt="Contact Page">

The `contact page` is a page that contains the contact form and image links to the business's social media profiles. The contact form contains fields such as name, email, message and a submit button which will validate, clean and will place user input into an email sent automatically to the correct address.

### Responsive Design
<div class="center-container">
    <img src="{{site.baseurl}}/assets/images/responsive_design_landing_page.png" alt="Product page mobile view" width="328px" height="424px">
</div>

### Implementation

#### Responsive Menu

{% highlight ruby %}
<div class="topnav" id="myTopnav">
    <a href="javascript:void(0);" class="icon" onclick="ResponsiveMenu()">&#9776;</a>
    <a href="index.html">Product</a>
    <a href="sign_up_page.php">Sign Up</a>
    <a href="contact_page.php">Contact</a>
</div>


function ResponsiveMenu() {	
    //Create a reference to the element that holds the myTopNav Id.
    var x = document.getElementById("myTopnav");	
    //If the reference has a classname of topnav.			
    if (x.className === "topnav") {		
        //Add the classname responsive.			
        x.className += " responsive";				
    } else {    //If the class name already has the responsive name added on, switch it back to topnav.	
        x.className = "topnav";
    }
}
{% endhighlight %}

One great part of the implementation is the use of a responsive menu to offer both desktop, mobile and intermediary devices a coherant experience. On desktop, you will observe that the navigation bar contains both the business title and links stretched across the page. On mobile and devices between, you will observe that the navigation bar changes the links to a single burger menu icon which upon being pressed, will display the links as a block below. To do this, the project will assign class names and removes class names depending on `viewport` size. A larger size will remove the responsive classname which applies styles to show the links. A smaller size will add the responsive class so that the links are not displayed and is replaced by the burger menu.

#### Colour Variables and Base Styles

{% highlight ruby %}
/* Colour Variables */
:root {
--color-background: #1F2937;
--color-main: #F9FAF8;
--color-main-light: #E5E7EB;
--color-secondary: #3882F6;
}

/*========== base styles ==========*/
* {
font-family: "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
    "Helvetica Neue", sans-serif;
margin: 0;
padding: 0;
box-sizing: border-box;
text-rendering: optimizeLegibility;
font-size: inherit;
}

html {
font-size: 56.25%;
}
...
{% endhighlight %}

Another area of the implementation involves the use of `colour variables` and `base styles`. These are used to simplify the styling process and remove redundant areas. By defining `colour variables`, it is quicker and easier to reference the variable in the right context of use to apply the style rather than set the colour manually. Plus, if we want to change all instances of this colour, it is easier to change the variable and see the whole site change rather than change every instance. By defining `base styles`, we can declare default styling that is inherited across all elements. Where we want to define styling specific to one element or a group, we can specify a selector more important than the base style, which is more efficient and less redudant than specifying each style without inheritence. 

#### Media Queries

{% highlight ruby %}
@media screen and (max-width: 600px) {
    nav {
        display: block;
    }
...

@media screen and (max-width: 720px) {
    .benefits-container {
        display: block;
    }
...

@media only screen and (max-width: 1000px) {
    .hero-container {
        padding-left: 5%;
        padding-right: 5%;
        display: block;
        text-align: center;
...
{% endhighlight %}

A key concept in project implementation is the use of `media queries`. These detect changes in the `viewport` size and depending on if the condition is met, will make styling changes as long as it remains true. A popular method is to provide `viewport` width checkpoints which will alter elements so that they are responsive in all devices from desktops, iPads to mobiles. 

#### Sign Up and Newsletter

{% highlight ruby %}
<form action="" method="POST" id="sign_up">
    <!-- Display error message. -->
    <span style="color: red; display: block;"><?php echo $nameErr;?></span>
    <label for="name">Name:</label>
    <br>
...

// If all checks are complete and save to newsletter is valid.
if ($valid == TRUE) {
    // Read contents of newsletter.text and save to variable.
    $contents = file_get_contents("docs/newsletter.text");
    // If file contains the user's name.
    if (strpos($contents, strtolower($name)) !== false)
    {
        echo "Already Signed Up";
        $name = $email = $contact_number = "";
        $contact_method = [];
    }
    else {
        // Open newsletter.text.
        try {
            $newsletter = fopen("docs/newsletter.text", "a");
        } catch (Exception $e) {
            echo "Unable to open file";
        }

        // Convert contact methods into a string.
        $contact_method_str = "";
        foreach ($contact_method as $method) {
            $contact_method_str .= $method . "\n";
        }
        $date = date("l jS \of F Y h:i:s A");

        // Concatenate components of text to place into newsletter.text.
        $txt = $date . "\n" . strtolower($name) . "\n" . $email . "\n" . $contact_number . "\n" . $contact_method_str . "\n";
        // Try to write text to newsletter.text.
        try {
            fwrite($newsletter, $txt);
            echo "Sign Up Successful";
        } catch (Exception $e) {
            echo "Sign Up Unsuccessful";
        }
        fclose($newsletter);

        $name = $email = $contact_number = "";
        $contact_method = [];
    }
}
{% endhighlight %}

As explained, the newsletter will make use of the sign up form, and back-end functionality to write to the newsletter file. To do this, the sign up form will contain labels and fields that prompt the user for the required input. Error messages and previous values are displayed using PHP's `echo` function upon refresh. The submittion from this form will be sent to the same address and as the file requires the PHP script, this is run with the form values stored within the `POST` object. The appropriate cleaning and validation is undergone and if no errors are detected, the file is opened, read to check for a duplicate name, message formed from input and written to, appending to the end of the file. 

#### Contact and Automatic Email

{% highlight ruby %}
<!-- Send to same address. Require links PHP variables of script to page. -->
<form action="" method="POST">
    <!-- Display error message. -->
    <span style="color: red; display: block;"><?php echo $nameErr;?></span>
    <label for="name">Name:</label>
    <br>
...

if ($nameErr == "" && $emailErr == "" && $messageErr == "") {
        $msg = "Name:" . "\n" . $name . "\n" . "\n" . "Email:" . "\n" . $email . "\n" . "\n" . "Message:" . "\n" . $message;
        $msg = wordwrap($msg, 70);

        if (mail("kylekeene.welch@gmail.com", "Landing Page Contact", $msg)) {
            echo "Email successfully sent";
        }
        else {
            echo "Email sending failed";
        }
}
{% endhighlight %}

Mentioned before, the contact form will implement automatic email sending with a message dynamically formed from cleaned user input. This is done through the contact form containing and prompting the required fields to form an email with the desired message. Error messages and previous values are displayed using PHP's `echo` function upon refresh. The submittion from this form will be sent to the same address and as the file requires the PHP script, this is run with the form values stored within the `POST` object. The appropriate cleaning and validation is undergone and if no errors are detected, the message is constructed from user input and is sent to the correct address.
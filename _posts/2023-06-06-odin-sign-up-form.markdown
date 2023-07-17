---
layout: post
title:  "The Odin Project: Sign-Up Form"
date:   2023-06-06 19:00:16 +0100
categories: ['HTML', 'CSS', 'JS', 'Web']
description: "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills. Creates a sign up page with a form and validation handled through the JavaScript Validation API."
repo: "https://github.com/KyleKeeneWelch/odin-sign-up-form"
---

<style>
.center-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}
</style>

## Summary
This project is a project undertaken as part of `The Odin Project` learning web course teaching `HTML`, `CSS` and `JavaScript` skills. It involved putting into practice the teachings of `JavaScript` taught in the previous lessons and required the active use of research and preparation to find the correct JavaScript methods to use.

The use of JavaScript is highly introduced within this project to demonstrate my skills in DOM methods and the manipulation of `HTML` and `CSS` from `JavaScript`. The `Sign Up Form` uses JavaScript and `event listeners` to detect when the user enters into the several fields in the form and to validate the input to ensure it meets all the validation rules and restrictions. These rules and restrictions are applied through checks from the built-in `constrain validation API` which will test the input and return a boolean value. The result of a falsy value will cause the script to alter the text content and display of an error message to show the violated rule for the user to make changes. Where the form is not valid, JavaScript uses `preventDefault()` to prevent the form from being sent off as a Http POST Request. **Note: Project aims to indulge in the validation and creation of the form and does not handle the request. Please visit [Odin-Landing-Page](https://kylekeenewelch.github.io/my-site/html/css/js/php/xampp/web/2023/05/17/odin-landing-page.html) for an example that handles a request.**

## Features

- **Preventing Form Submittion When Invalid** - The web page in a realistic scenario would avoid the overhead of unecessary server requests by preventing the form from being submitted when it is invalided. 

- **Displaying Messages For Violated Validation Rules** - Through the use of event listeners, the form is capable of displaying messages by checking user input upon entry. The message displayed will depend on the check failed by the form and is removed once it no longer fails. 

- **Constrain Validation API** - To perform such checks we use the Constrain Validation API as a quick and easy way to check the validity of form inputs. We decide upon the rules we want to enforce on a particular input, state these in HTML, then perform our own validation using the functions provided by the API.

- **Appealing Design and Business Sign Up Page** - Maintains an appealing design and structure that is typical of popular business sign up pages and form elements. 

### Display Structure
<img src="{{site.baseurl}}/assets/images/display_structure_sign_up_form.png" alt="Display Structure">

Structure includes a left panel with a background and overlay with logo and company name. Also, it includes sign up text that grabs user's attention, the sign up form with inputs, submit button and a log in link (login page not implemented).

### Form Labels and Inputs

<div class="center-container">
    <img src="{{site.baseurl}}/assets/images/form_labels_inputs_sign_up_form.png" alt="Form Labels and Inputs">
</div>

Form labels are provided with their associated field names as well as the inputs they link to. These include `First Name`, `Email`, `Password`, `Last Name`, `Phone Number` and `Confirm Password`.  

### Form Input Messages

<div class="center-container">
    <img src="{{site.baseurl}}/assets/images/form_input_messages_sign_up_form.png" alt="Form Input Messages">
</div>

Form input messages are provided when the user enters some input into a field that does not satisfy one of the validation rules placed on that field. These are displayed below the associated field and disappear once the checks are valid. 

### Form Submit

<div class="center-container">
    <img src="{{site.baseurl}}/assets/images/form_submit_sign_up_form.png" alt="Form Submit">
</div>

A valid entry to the fields in the form and clicking on the create account button will create a `POST request` object addressed to the same page which is not handled within this project. Invalid entries are prevented from being created as a `request` object through the `preventDefault()` function.

### Implementation

#### References to Elements

{% highlight ruby %}
const first_name = document.getElementById('first-name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const last_name = document.getElementById('last-name');
const phone_number = document.getElementById('phone-number');
const confirm_password = document.getElementById('confirm-password');
const form = document.querySelector('form');

const first_name_error = document.getElementById('first-name-error');
const email_error = document.getElementById('email-error');
const password_error = document.getElementById('password-error');
const last_name_error = document.getElementById('last-name-error');
const phone_number_error = document.getElementById('phone-number-error');
const confirm_password_error = document.getElementById('confirm-password-error');
{% endhighlight %}

A key area in implementing the JavaScript in the project is to use references to elements in the page. These are variables that store the query results of certain element classes and IDs. The `getElementById` function will return only one element upon success. These variables can be placed at the top of the script and can be accessed within `DOM methods` which will manipulate the text content and styling of the referenced elements when required. This makes it easier to access and less redundant that making references to the same element in several locations.

#### Using Event Listeners

{% highlight ruby %}
first_name.addEventListener("input", (e) => {
    if (first_name.validity.tooShort) {
        first_name_error.textContent = "First Name needs to have at least 3 characters";
        first_name_error.style.display = 'inline-block';
    }
    else if(first_name.validity.valueMissing) {
        first_name_error.textContent = "First Name is required";
        first_name_error.style.display = 'inline-block';
    }
    else if (first_name.checkValidity()) {
        first_name_error.textContent = '';
        first_name_error.style.display = 'none';
    }
});
{% endhighlight %}

In order to provide the interactivity of the JavaScript script `event listeners` were used. These would pick up an assigned event to elements in the page such as the `input` event to the input fields. Once an entry was detected, the script would run the function provided with the assignment of the listener and would place the event as the argument. This function will provide the conditionals to check for whether the input field's value meets the criteria set. Through the `Constrain Validation API`'s functions, we can check to see if the validity of a particular attribute of an input field returns a true or false value. This can then be used to display validation messages under the appropriate field with the correct message to inform the user with the change needed to be met in order to satisfy the validation.

#### Form Validation and Password Match

{% highlight ruby %}
form.addEventListener("submit", (e) => {
    let pass1 = password.value;
    let pass2 = confirm_password.value;
    if (form.checkValidity()) {
        if (pass1 == pass2) {
            confirm_password_error.textContent = "";
            confirm_password_error.style.display = 'none';
        }
        else {
            confirm_password_error.textContent = "Passwords do not match";
            confirm_password_error.style.display = 'inline-block';
            e.preventDefault();
        }
    }
    else {
        e.preventDefault();
    }
})
{% endhighlight %}

The form itself also has an event listener within the implementation of the project and this is for the submit event. When the form's submit event has been detected, the function within the listener will be run. In this case, we will check for the value of the password fields to see if they match and to display the validation message under the confirm password field if not. In the cases where the form does not pass a validation check or the passwords do not match, we use the `preventDefault()` function to stop the default action of the event and to prevent the form creating and submitting a request object.
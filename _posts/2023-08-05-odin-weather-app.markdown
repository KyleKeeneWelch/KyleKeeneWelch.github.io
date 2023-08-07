---
layout: post
title: "The Odin Project: Weather App"
date: 2023-08-05 13:00:16 +0100
categories:
  [
    "HTML",
    "CSS",
    "JS",
    "Web",
    "OOP",
    "Webpack",
    "NPM",
    "HTML Webpack Plugin",
    "Babel",
    "Modules",
    "API",
    "Async/Await",
  ]
description: "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills. Uses Objects and Modules to create data structures representing the entities required in a Weather application. Makes calls to the Weather API using fetch() and async functions to obtain relevant Weather information to be processed and displayed appropriately on the DOM."
repo: "https://github.com/KyleKeeneWelch/odin-weather-app"
---

## Summary

This project is a project undertaken as part of `The Odin Project` learning web course teaching `HTML`, `CSS` and `JavaScript` skills. It involved putting into practice the teachings of `Async/Await', 'Promises' and 'API calls using fetch()' to develop a Weather application with asynchronous data handling and customizable responses from the Weather API.

The project aims to provide a simple Weather-based dashboard service with the relevant Weather information provided based on an entered location. It offers a summary, some statistics and a forecast that can be altered to show daily and hourly forecast information. **Note - Weather API free tier returns forecast data for up to three days and so the application caters for this.**

The application logic is split into two modules `Weather` for calls to the Weather API and storage of the users current configuration and `Display` which contains the DOM methods for accessing and updating information. We use classes, getter and setter methods as well as imports/exports to enforce closure and provide effective modular code which is easier to debug and update.

Data that is obtained through `fetch()` is accessed by several `update` methods which look into certain areas of the `json` object and pick out key information to be displayed to the user. Preferences such as which temperature display should be shown is handled by getting and setting a `tempDisplay` value in the Weather module and is used by the ternary operator to assign values based on whether celsius is currently assigned. Each time the user clicks to switch these values, we access a local copy of the data instead of making an unneeded call to the API for the same information and change which key values we access in the `json` object.

The page is generated with `HTML Webpack Plugin` and the modules are passed as entry points that produce a single script to be injected into the page. The application is optimized and the size reduced using the `devtool` option provided by webpack and this is set to `eval`. The application also uses `babel` to transpile its code into a format that can be easily used by older browsers and browser versions while still maintaining the modern syntax.

## Features

- **Modular** - Makes use of JavaScript ES6 import syntax to import methods belonging to classes of application data structures. Modules are standalone and can be tested by themselves before integrated with the rest of the application.

- **JavaScript Validation API** - Location Search Input and Form are handled through the JavaScript Validation API and produce coherrant error messages when the user provides invalid input.

- **Date-fns Integration** - The application imports the `format()` function part of the Date-fns package which is used to pass through Date text collected from the `json` object and output in a specified format.

- **Webpack Optimization** - Utilizies Webpack devtool to optimize performance and reduce application size. HTML Webpack Plugin is used to generate the page with the required script and stylesheet injected.

- **Babel Transpilation** - Converts modern syntax into a format that can be used by older browsers and browser versions so the application can be used by more users who prefer older mediums.

- **Async/Await** - Uses `Promise-Like` syntax in `Async` functions to await values from asynchronous callbacks and to return a thenable promise. `Try/Catch` block is used as if the function were synchronous to track and handle errors.

- **Background Fade Upon Condition Change** - Utilizes `setInterval()` and a decrement to the `opacity` property to "fade" the background into the image which represents the Weather condition that the currently searched location contains.

### Display

<img src="{{site.baseurl}}/assets/images/projects/weather-app/display_weather_app.png" alt="Display">

The User Interface of the Weather App contains five key elements: `Background`, `Search Location Form`, `Summary`, `Statistics` and `Forecast`. The background image is determined by the current weather condition of the searched location. The form contains appropirately validation and an event listener to process the input and fetch the related data. The summary maintains key information about the location, date, time, condition and temperature. Statistics provide a more detailed list of information including statistics such as the chance of rain. The forecast is an element that can be changed to provide a daily or hourly overview of future Weather conditions.

### Daily and Hourly Forecast

<img src="{{site.baseurl}}/assets/images/projects/weather-app/hourly_forecast_weather_app.png" alt="Hourly Forecast">

Clicking on the `Daily` or `Hourly` buttons will alter the forecast container to display either the daily forecast or the hourly forecast. Daily forecast contains only the next three days as part of the API's free tier limiting to three days. Hourly provides a depiction of the weather throughout each of twenty four hours.

### Search Location Validation

<img src="{{site.baseurl}}/assets/images/projects/weather-app/validation_weather_app.png" alt="Search Location Validation">

The Search Location element includes the input, form and button. We validate upon the `input event` and the `submit event` triggered by entering and submitting the form to provide good user experience and minimal input errors. We check for entry as the input is required, min-length, max-length and also whether the API returns data based on the provided location, each of which contains a custom error message to be displayed to the user when occured.

### Temperature Display

<img src="{{site.baseurl}}/assets/images/projects/weather-app/temp_display_weather_app.png" alt="Temperature Display">

We click on the switch button next to the temperature in the summary to update all temperature values on the User Interface to the currently assigned display.

### Fade Background

<img src="{{site.baseurl}}/assets/images/projects/weather-app/fade_background_weather_app.png" alt="Fade Background">

Entering a valid location that produces a condition that is different from the current condition which enforce a change to the background using a `fade animation`.

### Implementation

#### Async/Await and Fetch()

{% highlight ruby %}
static async getData(location) {
try {
const response = await fetch(
`https://api.weatherapi.com/v1/forecast.json?key=###q=${location}&days=3`
);
return await response.json();
} catch (error) {
throw new Error(error);
}
}
{% endhighlight %}

The Weather application collects its data through the use of the free tier of a Weather API service. To retrieve this information, we supply the correct URL with its parameters inside of a `fetch()` request to asynchronously call to that information and receive a response. We use `async` in the function signature to declare that the function is asynchronous and `await` before fetch to declare that we want to wait for a response before running the rest of the code inside the function. Fetch returns a response that needs to be converted using `json()` so that we can access the body of the result which is the retrieved JSON data. The async function will always return a promise which can be chained with `.then()` to access the data it retrieves. We use a `try catch block` inside the async function similar to synchronous code to catch any errors that occur during the request and response.

#### Fade Background Animation

{% highlight ruby %}
// Emulates a fade animation through the manipulation of the opacity property.
static async fadeBackground(background) {
try {
return new Promise(function (resolve, reject) {
const decrement = 0.01;
const opacityInterval = setInterval(changeOpacity, 10);

        // Change opacity by decrement every interval until 0.
        function changeOpacity() {
            background.style.opacity -= decrement;
            if (background.style.opacity <= 0) {
            clearInterval(opacityInterval);
            resolve();
            }
        }
        });

    } catch (error) {
    console.log(error);
    }

}
{% endhighlight %}

A key element in the implementation of the application is the change of the background from the condition of the searched location. This produces an image relevant to the conditon returned from the searched location and the transition between two different conditions is handled through a fade animation. This animation is handled within its own function that is called on the background we wish to make transparent before showing the image behind as the new condtion image. To perform the animation, we return a promise that resolves once the opacity is set to zero. We decrease the opacity asyncronously through a decrement value and `setInterval` to reduce the opacity property of the background by the decrement after a defined set of time. We perform the check to see if the opacity has reached zero after the decrement is applied. A `try catch block` is used to catch any errors that occur within the process. We chain `.then()` after the call to the function to replace the background image to its full opacity once the animation is complete (the other image is temporary).

#### Webpack Devtool, Template, Plugin and Babel Loader

{% highlight ruby %}
module.exports = {
mode: "development",
entry: {
entry: ["./src/scripts/display.js", "./src/scripts/weather.js"],
},
devtool: "eval",
plugins: [
new HtmlWebpackPlugin({
inject: true,
template: "./src/index.html",
filename: "index.html",
}),
],
output: {
filename: "main.js",
path: path.resolve(\_\_dirname, "dist"),
clean: true,
},
module: {
rules: [
{
test: /\.js$/,
exclude: /node_modules/,
use: {
loader: "babel-loader",
options: {
presets: ["@babel/preset-env"],
},
},
},
...
{% endhighlight %}

The implementation also includes webpack optimization and the use of the `HTML Webpack Plugin`. The config will include the several entry points which will be processed and a single output script produced. The devtool option `eval` will optimize the source directory and will produce files in the distribution very quickly, bundling the source-maps without the need to map back to the code. We test for JavaScript files excluding files found in the `node_modules` and use the `Babel Loader` with the `preset-env` to transpile the found JavaScript code into a usable format across all browsers and browser versions.

#### JavaScript Validation API

{% highlight ruby %}
// Search Form Validation.
searchForm.addEventListener("submit", (e) => {
if (searchInput.validity.tooShort) {
searchError.textContent = "Location needs to be at least 3 characters";
searchError.classList.add("active");
searchForm.style.borderBottom = "1px solid var(--error-color)";
} else if (searchInput.validity.valueMissing) {
searchError.textContent = "Location is required";
searchError.classList.add("active");
searchForm.style.borderBottom = "1px solid var(--error-color)";
}

    // If form is valid get data, save locally and update location.
    if (searchForm.checkValidity()) {
    e.preventDefault();
    this.getWeatherData(searchInput.value).then((data) => {
        if (data.error) {
        searchError.textContent = "No matching location found";
        searchError.classList.add("active");
        searchForm.style.borderBottom = "1px solid var(--error-color)";
        return;
        }
        this.setData(data);
        this.updateLocation(data);
    });
    searchError.classList.remove("active");
    searchError.textContent = "";
    searchInput.value = "";
    searchForm.style.borderBottom = "1px solid var(--color-main)";
    } else {
    e.preventDefault();
    }

});
{% endhighlight %}

We use the JavaScript Validation API with the Search Location element of our application to validate the input and respond to the submission to retrieve Weather data. We check for if the value is missing, too short and if the form is deemed as valid. If the form is valid we prevent it from refreshing the page and retrieve our Weather data with our search input value. We check for errors from the process and apply appropriate error messaging if required. We save our retrieved data locally to prevent making unneccessary API calls and we call `updateLocation(data)` passing in the data. `updateLocation(data)` contains several callbacks which change DOM elements to reflect on the data retrieved from the API call.

#### Updating Hourly forecast and Date Formatting

{% highlight ruby %}
static updateForecastHourly(data) {
const forecastHours = Array.from(
document.getElementsByClassName("forecast-hour")
);
const forecastHourTemperatures = Array.from(
document.getElementsByClassName("forecast-hour-temperature")
);
const forecastHourConditions = Array.from(
document.getElementsByClassName("forecast-hour-condition")
);
const forecastHourImages = Array.from(
document.getElementsByClassName("forecast-hour-image")
);

    // loops through each hour for each statistic and assigns the data.
    forecastHours.forEach((hour, index) => {
      hour.textContent = format(
        new Date(data.forecast.forecastday[0].hour[index].time),
        "p"
      );
    });
    ...

{% endhighlight %}

When we update the DOM to reflect the data in the implementation, we access the information either directly or through looping through values stored in an array. The daily forecast can directly access the data to set its DOM elements appropriately however, the hourly forecast has too many DOM elements to set directly for it to be efficient. Instead, we convert each class of hourly forecast DOM element into an array and we loop through this array to assign values found in an equally sized array for the current hour in the data. We do this for each element and save time and possible errors.

#### Ternary Operator and Local Data

{% highlight ruby %}
Weather.getTempDisplay() == "celsius"
? (locationTemperature.textContent = data.current.temp_c + "°C")
: (locationTemperature.textContent = data.current.temp_f + "°F");
{% endhighlight %}

When we retrieve our Weather data, we save it locally before performing any changes to the DOM. We do this so we can access it again when we require changing the temperature measure to celsius or fahrenheit. As it is the same data, we can call the same `updateLocation` callbacks passing in the local data and change a variable which stores the current assigned temperature measure. Through the ternary operator, we can check for whether the temperature measure is celsius and can set the celsius value or fahrenheit value depending on the true or false value of the condition. This is applied to all instances where temperature is displayed and therefore through a single click on the switch icon, we can update all temperature values to display the alternative measure.

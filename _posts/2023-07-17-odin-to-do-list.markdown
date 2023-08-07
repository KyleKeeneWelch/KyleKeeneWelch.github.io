---
layout: post
title:  "The Odin Project: To-Do-List"
date:   2023-07-17 13:00:16 +0100
categories: ['HTML', 'CSS', 'JS', 'Web', 'OOP', 'Webpack', 'NPM', 'HTML Webpack Plugin', 'Local Storage', 'Modules']
description: "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills. Uses Objects and Modules to create data structures representing the entities required in a To-Do-List application. Data is stored and accessed through local storage and pages are generated and optimized through Webpack and plugin."
repo: "https://github.com/KyleKeeneWelch/odin-to-do-list"
---

## Summary
This project is a project undertaken as part of `The Odin Project` learning web course teaching `HTML`, `CSS` and `JavaScript` skills. It involved putting into practice the teachings of `Modules', 'OOP' and 'Webpack' to develop a To-Do-List application with optimized performance, storage and use of good coding practices.

The project aims to provide the user with the functionality required in creating projects, tasks and notes for a project and see which tasks are due today or this week. It provides a simplistic user interface, exported classes to represent each data structure, and DOM methods to provide the interactivity between the user and the application.

To provide manipulation of dates and a sense of schedule within the application, `Date-fns` an imported library was used and its obtained functions integrated to return values for much of the conditionals relating to date input. These included `isToday()`, `isThisWeek()` and `isPast()`.

The To-Do-List accesses Local Storage to obtain the saved object from a previous session. New users have their object set to null which in turn causes the application to instantiate a new `ToDoList` object with the default projects. Every time a meaningful change is to be made to the To-Do-List, the application will access the related method within the `Storage` module that obtains the `ToDoList` object, makes the change, then saves the change to storage. The `Storage` module has access to imported functions from the classes of the objects it changes and so makes calls to these methods alongside save operations rather than the methods themselves. 

The page is generated with `HTML Webpack Plugin` and the modules are passed as entry points that produce a single script to be injected into the page. The application is optimized and the size reduced using the `devtool` option provided by webpack and this is set to `eval`.

## Features

- **Modular** - Makes use of JavaScript ES6 import syntax to import methods belonging to classes of application data structures. Modules are standalone and can be tested by themselves before integrated with the rest of the application.

- **JavaScript Validation API** - Modal forms and edit forms are handled through the JavaScript Validation API and produce coherrant error messages when the user provides invalid input. 

- **Date-fns Integration** - The application imports functions part of the Date-fns package which are used in conditionals to validate user date input.

- **Webpack Optimization** - Utilizies Webpack devtool to optimize performance and reduce application size. HTML Webpack Plugin is used to generate the page with the required script and stylesheet injected.

- **Local Storage** - Uses the browser's local storage cache to store and access the state of the ToDoList object and updates are made when a meaningful change has been met. 

### Creating Project

<img src="{{site.baseurl}}/assets/images/create_project_to_do_list.png" alt="Creating Project">

Produces a create project modal when the user clicks the `Create Project` button on the tool bar or the plus icon on the sidebar. 

### Creating Task
<img src="{{site.baseurl}}/assets/images/create_task_to_do_list.png" alt="Creating Task">

Produces a create task modal when the user clicks the `Create Task` button on the tool bar.

### Creating Note

<img src="{{site.baseurl}}/assets/images/create_note_to_do_list.png" alt="Creating Note">

Produces a create note modal when the user clicks the `Create Note` button on the tool bar. 

### Today and This Week

<img src="{{site.baseurl}}/assets/images/today_to_do_list.png" alt="Today">

<img src="{{site.baseurl}}/assets/images/this_week_to_do_list.png" alt="This Week">

The Today and This Week projects are displayed when the appropriate view project button is clicked. They are themselves projects which contain the tasks that evaluate to having a due date that is today or this week.

### Show and Hide

<img src="{{site.baseurl}}/assets/images/show_hide_to_do_list.png" alt="Show Hide">

Displays the task or note grid when the show / hide toolbar buttons are clicked. Hiding both the tasks and notes will leave the project display empty with just the project heading shown.

### Task and Note Edit

<img src="{{site.baseurl}}/assets/images/task_note_edit_to_do_list.png" alt="Task and Note Edit">

Clicking on a task name, due date or note content will produce an input field with the current value set. Changing this and clicking on the tick icon will update the value and this will be displayed and saved to local storage. 

### Implementation

#### Retrieving and Setting to Local Storage

{% highlight ruby %}
// Save to local storage.
static saveToDoList(data) {
    localStorage.setItem('toDoList', JSON.stringify(data));
}

static getToDoList() {
    // Retrieve local storage.
    const toDoList = Object.assign(
        new ToDoList(), JSON.parse(localStorage.getItem('toDoList'))
    );

    // Init toDoList.
    if (toDoList === null) {
        const newToDoList = new ToDoList();
        const agenda = new Project('Agenda');
        const today = new Project('Today');
        const thisWeek = new Project('This Week');
        newToDoList.addProject(agenda);
        newToDoList.addProject(today);
        newToDoList.addProject(thisWeek);
        this.saveToDoList(newToDoList);
        return newToDoList;
    }
    
    // Assign projects from local storage.
    toDoList.setProjects(
        toDoList.getProjects()
        .map((project) => Object.assign(new Project(), project))
    );

    // Assign tasks to projects from local storage.
    toDoList.getProjects().forEach((project) => {
        project.setTasks(project.getTasks()
        .map((task) => Object.assign(new Task(), task))
        );
    });

    return toDoList
}
{% endhighlight %}

Within the application's implementation, we use the Storage module often to retrieve and update the state of the `ToDoList` object to local storage. Taking a look at the module, we use `saveToDoList()` and `getToDoList()` to perform the loading and saving operations to local storage. We use `setItem()` in `saveToDoList()` to specify the item we want to save to in local storage and also the data we want to save to the item. We also stringify this data into a `JSON` format to enable this to happen. When we retrieve the item in `getToDoList()` we use `Object.assign()` to assign the retrieved data to a new ToDoList object. We then proceed to populate the new object with each of the projects and tasks obtained from local storage. If a ToDoList object is not returned and instead null is produced, a new ToDoList object is created with the default projects. 

#### Evaluating Tasks Today and This Week

{% highlight ruby %}
// Returns tasks in this project that have a due date that is today.
getTasksToday() {
    return this.tasks.filter((task) => {
        const taskDate = new Date(task.getDueDateFormatted());
        return isToday(taskDate);
    })
}

// Returns tasks in this project that have a due date that is this week.
getTasksThisWeek() {
    return this.tasks.filter((task) => {
        const taskDate = new Date(task.getDueDateFormatted());
        return isThisWeek(taskDate);
    })
}
{% endhighlight %}

The Project module contains the methods in the implementation for evaluating tasks that are due today and this week. `getTasksToday()` and `getTasksThisWeek()` will use the `filter()` function to filter through each task in the project and to include only those that return a truthy value. The condition will include the use of the imported library `Date-fns` and the functions `isToday()` or `isThisWeek()` and the task due date will be passed through to be tested. 

#### Webpack Devtool, Template and Plugin

{% highlight ruby %}
module.exports = {
  mode: 'development',
  entry: {
    'entry': ['./src/scripts/Project.js', './src/scripts/Storage.js', './src/scripts/Task.js', './src/scripts/ToDoList.js', './src/scripts/Display.js', './src/scripts/Note.js'],
  },
  devtool: 'eval',
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
},
{% endhighlight %}

The implementation also includes webpack optimization and the use of the `HTML Webpack Plugin`. The config will include the several entry points which will be processed and a single output script produced. The devtool option `eval` will optimize the source directory and will produce files in the distribution very quickly, bundling the source-maps without the need to map back to the code.

#### JavaScript Validation API

{% highlight ruby %}
// Validates create task submission. Passes user input to handler if valid.
createTaskForm.addEventListener('submit', (e) => {
    if (taskNameField.validity.valueMissing) {
        taskNameError.textContent = 'Name is required';
        taskNameError.classList.add('active');
        taskNameField.style.border = '2px solid var(--error-color)';
    }

    if (dueDateField.validity.valueMissing) {
        dueDateError.textContent = 'Due date is required';
        dueDateError.classList.add('active');
        dueDateField.style.border = "2px solid var(--error-color)";
    }

    if (isPast(new Date(dueDateField.value))) {
        if (!isToday(new Date(dueDateField.value))) {
            dueDateError.textContent = 'Due date is in the past';
            dueDateError.classList.add('active');
            dueDateField.style.border = "2px solid var(--error-color)";
            return;
        }
    }
...
{% endhighlight %}

In order to validate user input, we use the JavaScript Validation API to determine whether specific validation rules have been broken and produce appropriate error messages according to these. We use `event listeners` to listen for the input event and the submission of the form to provide these checks at appropriate times, blocking invalid input attempts.

#### Keyboard Support

{% highlight ruby %}
// Initializes keyboard access with escape to close all modals (enter is the default key to submit in forms).
    static initKeyboardInput() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
        })
    }
{% endhighlight %}

The implementation also provides minimal keyboard support where the escape key can be used to close all open modals in the application. Submission in forms is by default set to the enter key and therefore can be left to imitate default functionality.

#### Displaying a Project

{% highlight ruby %}
// If the project is today/this week, gather tasks today from projects not including today and this week.
if (project.getName() === 'Today') {
    this.getToDoList().getProjects().forEach((projectInArr) => {
        if (projectInArr.getName() !== 'Today' && projectInArr.getName() !== 'This Week') {
            projectInArr.getTasksToday().forEach((task) => {
                taskArr.push(task);
            });
        }
    });
    project.setTasks(taskArr);
    Storage.saveToDoList(this.getToDoList());
    this.updateTasks(project.getTasks());
}
else if (project.getName() === 'This Week') {
    this.getToDoList().getProjects().forEach((projectInArr) => {
        if (projectInArr.getName() !== 'Today' && projectInArr.getName() !== 'This Week') {
            projectInArr.getTasksThisWeek().forEach((task) => {
                taskArr.push(task);
            });
        }
    });
    project.setTasks(taskArr);
    Storage.saveToDoList(this.getToDoList());
    this.updateTasks(project.getTasks());
}
else {
    this.updateTasks(project.getTasks());
    this.updateNotes(project.getNotes());
}
{% endhighlight %}

When we display projects in the implementation, we test for the project name passed through to display. If the project to be displayed is the `Today` or `This Week` projects, we check for all projects in the To-Do-List except `Today` and `This Week` and whether each task is due today / this week. We push each task that is due today / this week to the task array which is set as the tasks for the `Today` / `This Week` project. Through the `updateTasks()` function, we access the tasks now in the `Today` / `This Week` project and these are created and displayed. Notes are not displayed when its for the `Today` and `This Week` projects. A project name that isn't today or this week will have its tasks and notes accessed and updated in `updateTasks()` and `updateNotes()`. 
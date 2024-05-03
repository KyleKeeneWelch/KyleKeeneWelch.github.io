import "../styles/static.css";
import resume from "../assets/docs/resume.docx";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/brands";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import { Project } from "./project.js";
import format from "date-fns/format";

import controlAnElevator from "../assets/images/portfolio/control-an-elevator.png";
import actiGym from "../assets/images/portfolio/actigym.png";
import topedia from "../assets/images/portfolio/topedia.png";
import odinLandingPage from "../assets/images/portfolio/odin-landing-page.png";
import odinRockPaperScissors from "../assets/images/portfolio/odin-rock-paper-scissors.png";
import odinEtchASketch from "../assets/images/portfolio/odin-etch-a-sketch.png";
import odinCalculator from "../assets/images/portfolio/odin-calculator.png";
import odinSignUpForm from "../assets/images/portfolio/odin-sign-up-form.png";
import odinAdminDashboard from "../assets/images/portfolio/odin-admin-dashboard.png";
import odinLibrary from "../assets/images/portfolio/odin-library.png";
import odinTicTacToe from "../assets/images/portfolio/odin-tic-tac-toe.png";
import odinRestaurantPage from "../assets/images/portfolio/odin-restaurant-page.png";
import odinToDoList from "../assets/images/portfolio/odin-to-do-list.png";
import odinWeatherApp from "../assets/images/portfolio/odin-weather-app.png";
import expressLocalLibrary from "../assets/images/portfolio/express-local-library.png";

class Display {
  static projects = [];

  static clearProjectContainers() {
    const projectsContainer = document.getElementById("projects-container");
    projectsContainer.innerHTML = "";
  }

  static filterResults(searchItem) {
    this.projects.forEach((project) => {
      if (project.getTitle().toLowerCase().includes(searchItem.toLowerCase())) {
        this.createProjectContainer(project);
      } else if (
        project
          .getTags()
          .map((tag) => tag.toLowerCase())
          .includes(searchItem.toLowerCase())
      ) {
        this.createProjectContainer(project);
      }
    });
    const projectsContainer = document.getElementById("projects-container");
    if (projectsContainer.innerHTML == "") {
      const noResults = document.createElement("p");
      noResults.textContent = "No Results Found";
      projectsContainer.appendChild(noResults);
    }
  }

  static createProjectContainer(project) {
    setTimeout(() => {}, 300);

    const projectsContainer = document.getElementById("projects-container");

    const projectContainer = document.createElement("div");
    const projectDetails = document.createElement("div");
    const projectTitle = document.createElement("a");
    const projectDate = document.createElement("p");
    const projectTags = document.createElement("div");
    project.getTags().forEach((tag) => {
      const tagContainer = document.createElement("p");
      tagContainer.textContent = tag;
      projectTags.appendChild(tagContainer);
    });
    const projectDescription = document.createElement("p");
    const projectRepo = document.createElement("a");
    const projectRepoIcon = document.createElement("i");
    const projectImageContainer = document.createElement("a");
    const projectImage = document.createElement("img");

    projectContainer.classList.add("project-container");
    projectContainer.classList.add("animate");

    projectDetails.classList.add("project-details");

    projectTitle.classList.add("project-title");
    projectTitle.textContent = project.getTitle();
    projectTitle.href = project.getUrl();

    projectDate.classList.add("project-date");
    projectDate.textContent = format(project.getDate(), "PPP");

    projectDescription.textContent = project.getDescription();
    projectDescription.classList.add("project-description");

    projectRepo.href = project.getRepo();
    projectRepo.classList.add("project-repo");
    projectRepoIcon.classList.add("fa-brands");
    projectRepoIcon.classList.add("fa-github");
    projectRepoIcon.classList.add("icon");
    projectRepo.appendChild(projectRepoIcon);

    projectTags.classList.add("project-tags");

    projectImageContainer.href = project.getUrl();
    projectImage.src = project.getImage();
    projectImageContainer.appendChild(projectImage);

    projectDetails.appendChild(projectTitle);
    projectDetails.appendChild(projectDate);
    projectDetails.appendChild(projectDescription);
    projectDetails.appendChild(projectRepo);
    projectDetails.appendChild(projectTags);
    projectContainer.appendChild(projectDetails);
    projectContainer.appendChild(projectImageContainer);
    projectsContainer.prepend(projectContainer);
  }

  static updateTags() {
    const tagsContainer = document.getElementById("tags-container");
    const tags = [];

    this.projects.forEach((project) => {
      project.getTags().forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });

    tags.sort();

    tags.forEach((tag) => {
      const newTag = document.createElement("a");
      newTag.textContent = tag;
      newTag.addEventListener("click", (e) => {
        this.updateProjects(tag);
        document.querySelectorAll("#tags-container a").forEach((tag) => {
          tag.classList.remove("active");
        });
        e.target.classList.add("active");
      });
      tagsContainer.appendChild(newTag);
    });
  }

  static updateProjects(searchItem = "") {
    this.clearProjectContainers();
    if (searchItem == "") {
      this.projects.forEach((project) => {
        this.createProjectContainer(project);
      });
    } else {
      this.filterResults(searchItem);
    }
  }

  static initProjects() {
    this.projects.push(
      new Project(
        "Control An Elevator",
        new Date("2022-10-16"),
        [
          "C#",
          ".NET",
          "GUI",
          "MSAccess",
          "Disconnected Model",
          "Event Driven",
          "Entity Framework",
        ],
        "C# application using the popular .NET framework by Microsoft to simulate the actions and animation of an elevator.",
        "https://github.com/KyleKeeneWelch/control-an-elevator",
        "control-an-elevator.html",
        controlAnElevator
      )
    );

    this.projects.push(
      new Project(
        "ActiGym",
        new Date("2023-01-03"),
        [
          "Dart",
          "Flutter",
          "Android",
          "MSAccess",
          "iOS",
          "Mobile",
          "Hybrid",
          "Object Oriented",
        ],
        "Flutter Mobile Application written with Dart that serves as a workout planner and log to further fitness goals and abstract the fitness process.",
        "https://github.com/KyleKeeneWelch/actigym",
        "actigym.html",
        actiGym
      )
    );

    this.projects.push(
      new Project(
        "Topedia",
        new Date("2023-04-14"),
        [
          "Python",
          "HTML",
          "CSS",
          "JS",
          "Web",
          "SQLite",
          "API",
          "MVT",
          "Django",
        ],
        "Web application using the Django framework that will accommodate a series of topics for E-learning to be consumed by users of which personas will differ based on educational history and goals.",
        "https://github.com/KyleKeeneWelch/topedia",
        "topedia.html",
        topedia
      )
    );

    this.projects.push(
      new Project(
        "The Odin Project: Landing Page",
        new Date("2023-05-17"),
        ["HTML", "CSS", "JS", "PHP", "XAMPP", "Web"],
        "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills. Creates a simple landing page for a non-existing product/business.",
        "https://github.com/KyleKeeneWelch/odin-landing-page",
        "odin-landing-page.html",
        odinLandingPage
      )
    );

    this.projects.push(
      new Project(
        "The Odin Project: Rock Paper Scissors",
        new Date("2023-05-22"),
        ["HTML", "CSS", "JS", "Web"],
        "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills. Emulates the popular rock, paper, scissors game utilizing DOM methods and JavaScript.",
        "https://github.com/KyleKeeneWelch/odin-rock-paper-scissors",
        "odin-rock-paper-scissors.html",
        odinRockPaperScissors
      )
    );

    this.projects.push(
      new Project(
        "The Odin Project: Etch-a-Sketch",
        new Date("2023-05-25"),
        ["HTML", "CSS", "JS", "Web"],
        "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills. Provides a simple canvas layout and related tools to draw pixel-like images.",
        "https://github.com/KyleKeeneWelch/odin-etch-a-sketch",
        "odin-etch-a-sketch.html",
        odinEtchASketch
      )
    );

    this.projects.push(
      new Project(
        "The Odin Project: Calculator",
        new Date("2023-05-30"),
        ["HTML", "CSS", "JS", "Web"],
        "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills. Provides functionality typical of a calculator.",
        "https://github.com/KyleKeeneWelch/odin-calculator",
        "odin-calculator.html",
        odinCalculator
      )
    );

    this.projects.push(
      new Project(
        "The Odin Project: Sign-Up Form",
        new Date("2023-06-06"),
        ["HTML", "CSS", "JS", "Web"],
        "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills. Creates a sign up page with a form and validation handled through the JavaScript Validation API.",
        "https://github.com/KyleKeeneWelch/odin-sign-up-form",
        "odin-sign-up-form.html",
        odinSignUpForm
      )
    );

    this.projects.push(
      new Project(
        "The Odin Project: Admin Dashboard",
        new Date("2023-06-12"),
        ["HTML", "CSS", "JS", "Web", "CSS Grid"],
        "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills. Uses techniques of flexbox and grid to structure a typical admin dashboard layout.",
        "https://github.com/KyleKeeneWelch/odin-admin-dashboard",
        "odin-admin-dashboard.html",
        odinAdminDashboard
      )
    );

    this.projects.push(
      new Project(
        "The Odin Project: Library",
        new Date("2023-06-17"),
        ["HTML", "CSS", "JS", "Web", "CSS Grid", "Object Oriented"],
        "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills. Utilizes DOM methods and objects to create book entries and maintain a library application.",
        "https://github.com/KyleKeeneWelch/odin-library",
        "odin-library.html",
        odinLibrary
      )
    );

    this.projects.push(
      new Project(
        "The Odin Project: Tic-Tac-Toe",
        new Date("2023-06-21"),
        [
          "HTML",
          "CSS",
          "JS",
          "Web",
          "Factory Functions",
          "IIFE",
          "Object Oriented",
        ],
        "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills. Contains a tic-tac-toe grid and DOM methods to track the winning conditions and rounds within the popular game.",
        "https://github.com/KyleKeeneWelch/odin-tic-tac-toe",
        "odin-tic-tac-toe.html",
        odinTicTacToe
      )
    );

    this.projects.push(
      new Project(
        "The Odin Project: Restaurant Page",
        new Date("2023-06-28"),
        ["HTML", "CSS", "JS", "Web", "Webpack", "NPM", "HTML Webpack Plugin"],
        "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills. Generates pages for a made-up Japanese fast food chain utilizing JavaScript, NPM packages and Webpack Plugins.",
        "https://github.com/KyleKeeneWelch/odin-restaurant-page",
        "odin-restaurant-page.html",
        odinRestaurantPage
      )
    );

    this.projects.push(
      new Project(
        "The Odin Project: To-Do-List",
        new Date("2023-07-17"),
        [
          "HTML",
          "CSS",
          "JS",
          "Web",
          "Object Oriented",
          "Webpack",
          "NPM",
          "HTML Webpack Plugin",
          "Local Storage",
          "Modules",
        ],
        "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills. Uses Objects and Modules to create data structures representing the entities required in a To-Do-List application. Data is stored and accessed through local storage and pages are generated and optimized through Webpack and plugin.",
        "https://github.com/KyleKeeneWelch/odin-to-do-list",
        "odin-to-do-list.html",
        odinToDoList
      )
    );

    this.projects.push(
      new Project(
        "The Odin Project: Weather App",
        new Date("2023-08-05"),
        [
          "HTML",
          "CSS",
          "JS",
          "Web",
          "Object Oriented",
          "Webpack",
          "NPM",
          "HTML Webpack Plugin",
          "Babel",
          "Modules",
          "API",
          "Async/Await",
        ],
        "This project is a project undertaken as part of The Odin Project learning web course teaching HTML, CSS and JavaScript skills. Uses Objects and Modules to create data structures representing the entities required in a Weather application. Makes calls to the Weather API using fetch() and async functions to obtain relevant Weather information to be processed and displayed appropriately on the DOM.",
        "https://github.com/KyleKeeneWelch/odin-weather-app",
        "odin-weather-app.html",
        odinWeatherApp
      )
    );

    this.projects.push(
      new Project(
        "Express Local Library",
        new Date("2023-12-23"),
        ["Web", "Express", "NPM", "REST", "MVC", "MongoDB", "Async/Await"],
        "This project was the first big step into becoming familiar with Express and Back-end development in preparation for my final year artefact. It follows the Mozilla Express Tutorial to develop a simple library application with CRUD operations on authors, books, genres and book instances.",
        "https://github.com/KyleKeeneWelch/express-local-library",
        "express-local-library.html",
        expressLocalLibrary
      )
    );
  }

  static initContactEventListeners() {
    const contactForm = document.getElementById("contact-form");
    const contactName = document.getElementById("contact-name");
    const contactNameError = document.getElementById("contact-name-error");
    const contactEmail = document.getElementById("contact-email");
    const contactEmailError = document.getElementById("contact-email-error");
    const contactSubject = document.getElementById("contact-subject");
    const contactSubjectError = document.getElementById(
      "contact-subject-error"
    );
    const contactMessage = document.getElementById("contact-message");
    const contactMessageError = document.getElementById(
      "contact-message-error"
    );

    contactName.addEventListener("input", () => {
      if (contactName.validity.tooShort) {
        contactNameError.textContent = "Name needs to be at least 3 characters";
        contactNameError.style.display = "block";
        contactName.style.border = "1px solid var(--error-color)";
      } else if (contactName.validity.valueMissing) {
        contactNameError.textContent = "Name is required";
        contactNameError.style.display = "block";
        contactName.style.border = "1px solid var(--error-color)";
      } else if (contactName.checkValidity()) {
        contactNameError.textContent = "";
        contactNameError.style.display = "none";
        contactName.style.border = "1px solid var(--valid-color)";
      }
    });

    contactEmail.addEventListener("input", () => {
      if (contactEmail.validity.tooShort) {
        contactEmailError.textContent =
          "Email needs to be at least 3 characters";
        contactEmailError.style.display = "block";
        contactEmail.style.border = "1px solid var(--error-color)";
      } else if (contactEmail.validity.valueMissing) {
        contactEmailError.textContent = "Email is required";
        contactEmailError.style.display = "block";
        contactEmail.style.border = "1px solid var(--error-color)";
      } else if (contactEmail.validity.typeMismatch) {
        contactEmailError.textContent = "Please enter a valid email";
        contactEmailError.style.display = "block";
        contactEmail.style.border = "1px solid var(--error-color)";
      } else if (contactEmail.checkValidity()) {
        contactEmailError.textContent = "";
        contactEmailError.style.display = "none";
        contactEmail.style.border = "1px solid var(--valid-color)";
      }
    });

    contactSubject.addEventListener("input", () => {
      if (contactSubject.validity.tooShort) {
        contactSubjectError.textContent =
          "Subject needs to be at least 3 characters";
        contactSubjectError.style.display = "block";
        contactSubject.style.border = "1px solid var(--error-color)";
      } else if (contactSubject.validity.valueMissing) {
        contactSubjectError.textContent = "Subject is required";
        contactSubjectError.style.display = "block";
        contactSubject.style.border = "1px solid var(--error-color)";
      } else if (contactSubject.checkValidity()) {
        contactSubjectError.textContent = "";
        contactSubjectError.style.display = "none";
        contactSubject.style.border = "1px solid var(--valid-color)";
      }
    });

    contactMessage.addEventListener("input", () => {
      if (contactMessage.validity.tooShort) {
        contactMessageError.textContent =
          "Message needs to be at least 3 characters";
        contactMessageError.style.display = "block";
        contactMessage.style.border = "1px solid var(--error-color)";
      } else if (contactMessage.validity.valueMissing) {
        contactMessageError.textContent = "Message is required";
        contactMessageError.style.display = "block";
        contactMessage.style.border = "1px solid var(--error-color)";
      } else if (contactMessage.checkValidity()) {
        contactMessageError.textContent = "";
        contactMessageError.style.display = "none";
        contactMessage.style.border = "1px solid var(--valid-color)";
      }
    });

    contactForm.addEventListener("submit", (e) => {
      if (contactName.validity.valueMissing) {
        contactNameError.textContent = "Name is required";
        contactNameError.style.display = "block";
        contactName.style.border = "1px solid var(--error-color)";
      }

      if (contactEmail.validity.valueMissing) {
        contactEmailError.textContent = "Email is required";
        contactEmailError.style.display = "block";
        contactEmail.style.border = "1px solid var(--error-color)";
      }

      if (contactSubject.validity.valueMissing) {
        contactSubjectError.textContent = "Subject is required";
        contactSubjectError.style.display = "block";
        contactSubject.style.border = "1px solid var(--error-color)";
      }

      if (contactMessage.validity.valueMissing) {
        contactMessageError.textContent = "Message is required";
        contactMessageError.style.display = "block";
        contactMessage.style.border = "1px solid var(--error-color)";
      }

      if (contactForm.checkValidity()) {
        e.preventDefault();
        contactNameError.textContent = "";
        contactNameError.style.display = "none";
        contactName.style.border = "1px solid var(--valid-color)";
        contactEmailError.textContent = "";
        contactEmailError.style.display = "none";
        contactEmail.style.border = "1px solid var(--valid-color)";
        contactSubjectError.textContent = "";
        contactSubjectError.style.display = "none";
        contactSubject.style.border = "1px solid var(--valid-color)";
        contactMessageError.textContent = "";
        contactMessageError.style.display = "none";
        contactMessage.style.border = "1px solid var(--valid-color)";
        window.open(
          "mailto:kylekeene.welch@gmail.com?" +
            "&subject=" +
            contactSubject.value +
            "&body=" +
            "Name: " +
            contactName.value +
            "%0D%0A%0D%0A" +
            "Email: " +
            contactEmail.value +
            "%0D%0A%0D%0A" +
            "Message: " +
            contactMessage.value
        );
      } else {
        e.preventDefault();
      }
    });
  }

  static initPortfolioEventListeners() {
    const searchInput = document.getElementById("search-item");
    const searchForm = document.getElementById("search-form");
    const filterAll = document.getElementById("filter-all");
    const filterCollapse = document.getElementById("filter-collapse");
    const tagsContainer = document.getElementById("tags-container");

    // Search Form Validation.
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.updateProjects(searchInput.value);
    });

    filterAll.addEventListener("click", (e) => {
      this.updateProjects("");
      document.querySelectorAll("#tags-container a").forEach((tag) => {
        tag.classList.remove("active");
      });
      e.target.classList.add("active");
    });

    filterCollapse.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-chevron-right")) {
        e.target.classList.remove("fa-chevron-right");
        e.target.classList.add("fa-chevron-down");
        tagsContainer.style.display = "flex";
        tagsContainer.classList.remove("collapse");
        tagsContainer.classList.add("expand");
        setTimeout(() => {
          tagsContainer.classList.remove("expand");
        }, 1000);
      } else if (e.target.classList.contains("fa-chevron-down")) {
        e.target.classList.remove("fa-chevron-down");
        e.target.classList.add("fa-chevron-right");
        tagsContainer.classList.remove("expand");
        tagsContainer.classList.add("collapse");
        setTimeout(() => {
          tagsContainer.style.display = "none";
          tagsContainer.classList.remove("collapse");
        }, 1000);
      } else if (e.target.parentNode.classList.contains("fa-chevron-right")) {
        e.target.parentNode.classList.remove("fa-chevron-right");
        e.target.parentNode.classList.add("fa-chevron-down");
        tagsContainer.style.display = "flex";
        tagsContainer.classList.remove("collapse");
        tagsContainer.classList.add("expand");
        setTimeout(() => {
          tagsContainer.classList.remove("expand");
        }, 1000);
      } else if (e.target.parentNode.classList.contains("fa-chevron-down")) {
        e.target.parentNode.classList.remove("fa-chevron-down");
        e.target.parentNode.classList.add("fa-chevron-right");
        tagsContainer.classList.remove("expand");
        tagsContainer.classList.add("collapse");
        setTimeout(() => {
          tagsContainer.style.display = "none";
          tagsContainer.classList.remove("collapse");
        }, 1000);
      }
    });
  }

  static AssignResume() {
    const resumeBtns = document.getElementsByClassName("btn-download-resume");
    Array.from(resumeBtns).forEach((btn) => {
      btn.href = resume;
    });
  }

  static initApp() {
    this.AssignResume();
    if (document.getElementById("projects-container")) {
      this.initProjects();
      this.updateProjects();
      this.updateTags();
      this.initPortfolioEventListeners();
    } else if (document.getElementById("contact-form")) {
      this.initContactEventListeners();
    }
  }
}

Display.initApp();

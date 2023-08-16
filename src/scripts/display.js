import "../styles/static.css";
import resume from "../assets/docs/resume.docx";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/brands";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
import { Project } from "./project.js";
import format from "date-fns/format";

import myProjectImage from "../assets/images/porfolio/gallery1.png";

class Display {
  static projects = [];

  static clearProjectContainers() {
    const projectsContainer = document.getElementById("projects-container");
    projectsContainer.innerHTML = "";
  }

  static filterResults(searchItem) {
    this.projects.forEach((project) => {
      if (searchItem.toLowerCase() == project.getTitle().toLowerCase()) {
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
    const projectBreak = document.createElement("br");

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
    projectsContainer.appendChild(projectContainer);
    projectsContainer.appendChild(projectBreak);
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
        "Canvas",
        new Date("2023-08-14"),
        ["HTML", "CSS", "JS", "Pineapple"],
        "This is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hkThis is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hkThis is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hkThis is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hk",
        "https://github.com/KyleKeeneWelch/image-slider",
        "myproject.html",
        myProjectImage
      )
    );

    this.projects.push(
      new Project(
        "ToDoList",
        new Date("2023-08-14"),
        ["HTML", "CSS", "JS", "Apple"],
        "This is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hkThis is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hkThis is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hkThis is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hk",
        "https://github.com/KyleKeeneWelch/image-slider",
        "myproject.html",
        myProjectImage
      )
    );

    this.projects.push(
      new Project(
        "Library",
        new Date("2023-08-14"),
        ["HTML", "CSS", "JS", "Banana"],
        "This is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hkThis is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hkThis is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hkThis is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hk",
        "https://github.com/KyleKeeneWelch/image-slider",
        "myproject.html",
        myProjectImage
      )
    );

    this.projects.push(
      new Project(
        "Library",
        new Date("2023-08-14"),
        [
          "HTML",
          "CSS",
          "JS",
          "Banana",
          "Kiwi",
          "q",
          "a",
          "j",
          "o",
          "p",
          "u",
          "y",
          "e",
          "r",
          "m",
          "n",
          "b",
          "c",
          "x",
          "z",
          "8",
          "7",
          "5",
        ],
        "This is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hkThis is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hkThis is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hkThis is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hk",
        "https://github.com/KyleKeeneWelch/image-slider",
        "myproject.html",
        myProjectImage
      )
    );

    this.projects.push(
      new Project(
        "Library",
        new Date("2023-08-14"),
        ["HTML", "CSS", "JS", "Banana", "Strawberry"],
        "This is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hkThis is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hkThis is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hkThis is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hk",
        "https://github.com/KyleKeeneWelch/image-slider",
        "myproject.html",
        myProjectImage
      )
    );

    this.projects.push(
      new Project(
        "Library",
        new Date("2023-08-14"),
        ["HTML", "CSS", "JS", "Banana", "Watermelon"],
        "This is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hkThis is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hkThis is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hkThis is the descriptionhljjkmdgfhmnnnnnnnnfnfnfmfnfnde hjjfnkejxdhkfhds kjdshj hkxhxnjhxnkjmjhfkjh bnkf fdsnkhdfnkhjskn hk",
        "https://github.com/KyleKeeneWelch/image-slider",
        "myproject.html",
        myProjectImage
      )
    );
  }

  static initEventListeners() {
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
      this.initEventListeners();
    }
  }
}

Display.initApp();

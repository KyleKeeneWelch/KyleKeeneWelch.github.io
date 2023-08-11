import "../styles/static.css";
import resume from "../assets/docs/resume.docx";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/brands";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";

const resumeBtns = document.getElementsByClassName("btn-download-resume");
Array.from(resumeBtns).forEach((btn) => {
  btn.href = resume;
});

import "../styles/main.css";
import resume from "../assets/docs/resume.docx";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/brands";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";
// import galleryImageOne from '../assets/images/home/gallery1.png';
// import galleryImageTwo from '../assets/images/home/gallery2.png';
// import galleryImageThree from '../assets/images/home/gallery3.png';
// import galleryImageFour from '../assets/images/home/gallery4.png';

const resumeBtn = document.getElementById("btn-download-resume");
resumeBtn.href = resume;

// const galleryOne = document.getElementById('gallery-image-one');
// const galleryTwo = document.getElementById('gallery-image-two');
// const galleryThree = document.getElementById('gallery-image-three')
// const galleryFour = document.getElementById('gallery-image-four')
